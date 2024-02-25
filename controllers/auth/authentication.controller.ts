import express from 'express';
import Role from '../../models/role.model'
import bcrypt from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserModel, getUserByEmail, createUser } from '../../models/users.model';
import TokenSchema from './../../models/userToken.schema';
import nodemailer from "nodemailer"
import mongoose from 'mongoose';

   //USER REGISTRATION FUNCTION
   export const register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // Fetch role from the database
        const userRole = await Role.findOne({ role: 'User' });
        const role = userRole;
        // Rename roles from req.body to avoid conflicts
        const { email, password, username } = req.body;

        // Check if email, password, or username is missing
        if (!email || !password || !username) {
            console.log('Validation error: Missing email, password, or username');
            return res.status(400).json({ error: 'Missing email, password, or username' }).end();
        }

        // Check if email already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            console.log('Database error: Email is already in use');
            return res.status(400).json({ error: 'Email is already in use' }).end();
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt);

        const user = await createUser({
            email,
            username,
            roles: role,
            password: hashedPassword
        });

        if (!user) {
            console.log('Database error: Failed to create user');
            return res.status(500).json({ error: 'Failed to create user' }).end();
        }
        return res.status(200).json(user).end();
    } catch (error) {
        console.log('Internal server error:', error);
        return res.status(500).json({ error: 'An internal server error occurred' }).end();
    }
};

//REGISTERS USER AS ADMIN(ONLY USE THIS FOR OFFICIAL ADMIN EMPLOYEES)
export const registerAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
      // Fetch role from the database
      const userRole = await Role.findOne({ role: 'Admin' });
      const role = userRole;
      // Rename roles from req.body to avoid conflicts
      const { email, password, username } = req.body;

      // Check if email, password, or username is missing
      if (!email || !password || !username) {
          console.log('Validation error: Missing email, password, or username');
          return res.status(400).json({ error: 'Missing email, password, or username' }).end();
      }

      // Check if email already exists
      const existingUser = await getUserByEmail(email);
      if (existingUser) {
          console.log('Database error: Email is already in use');
          return res.status(400).json({ error: 'Email is already in use' }).end();
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password,salt);

      const user = await createUser({
          email,
          username,
          roles: role,
          isAdmin: true,
          password: hashedPassword
      });

      if (!user) {
          console.log('Database error: Failed to create user');
          return res.status(500).json({ error: 'Failed to create user' }).end();
      }

      return res.status(200).json(user).end();
  } catch (error) {
      console.log('Internal server error:', error);
      return res.status(500).json({ error: 'An internal server error occurred' }).end();
  }
};


export const login = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await UserModel.findOne({ email }).select('+password').populate("roles", "role");

    if (!user) {
      return res.sendStatus(400);
    }

    console.log("Retrieved user:", user);

    if (!user.password) {
      console.error("User password is undefined or empty:", user);
      return res.status(500).send("Server error");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send("Password is incorrect");
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin, roles: user.roles },
      process.env.JWT_SECRET
    );

    //HTTPONLY IS TRUE TO PREVENT (CROSS SITE SCRIPTING) XSS ATTACKS
    return res.cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json({
      status:  200,
      message: "Success",
      data: user
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Server error");
  }
};

export const sendEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await UserModel.findOne({ email: { $regex: '^' + email + '$', $options: 'i' } });
    if (!user) {
      return res.status(404).send("User not found with this email");
    }

    const payload = {
      email: user.email
    };
    const expiryTime = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expiryTime });

    const newToken = new TokenSchema({
      userId: user._id,
      token: token
    });

    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "boktaimega007@gmail.com",
        pass: "skwxsmbtoejkgzzw"
      }
    });

    let mailDetails = {
      from: "boktaimega007@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `
        <html>
        <head>
          <title>Password Reset Request</title>
        </head>
        <body>
          <h1>Password Reset Request</h1>
          <p>Yo ${user.username}</p>
          <p>Got your reset request.</p>
          <a href="${process.env.LIVE_URL}/reset/${token}">
            <button style="background-color: #4CAF50; color: white; padding:  14px  20px; border: none; cursor: pointer; border-radius:  4px;">
              Reset Password
            </button>
          </a>
          <p>The token expires in  5 min.</p>
          <p>Thanks</p>
        </body>
        </html>`
    };

    mailTransporter.sendMail(mailDetails, async (err, data) => {
      if (err) {
        console.error("Error sending email:", err);
        await newToken.save();
        return res.status(500).send("Something went wrong while sending the email");
      } else {
        console.log("Email sent:", data);
        await newToken.save();
        return res.status(200).send("Email sent!");
      }
    });
  } catch (error) {
    console.error("Error in sendEmail function:", error);
    return res.status(500).send("Internal server error");
  }
};

export const resetPassword = (req, res) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {
      if (err) {
          if (err.name === 'TokenExpiredError') {
              return res.status(401).send("Reset link has expired");
          } else if (err.name === 'JsonWebTokenError') {
              return res.status(401).send("Invalid reset link");
          } else {
              return res.status(500).send("An error occurred while processing the reset link");
          }
      } else {
          const response = data;
          const user = await UserModel.findOne({email: {$regex: '^'+ response.email +'$', $options: 'i'}});
          const salt = await bcrypt.genSalt(10);
          const encryptedPassword = await bcrypt.hash(newPassword, salt);
          user.password = encryptedPassword;

          try {
              const updateUser = await UserModel.findOneAndUpdate(
                  {_id: user._id},
                  {$set: user},
                  {new: true}
              );
              return res.status(200).send("Password reset successfully!");
          } catch (error) {
              return res.status(500).send("Something went wrong (password reset)");
          }
      }
  });
};
