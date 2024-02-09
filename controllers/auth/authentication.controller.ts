import express from 'express';
import Role from '../../models/role.model'
import bcrypt from 'bcryptjs'
import  jwt  from 'jsonwebtoken';
import { UserModel, getUserByEmail, createUser } from '../../models/users.model';
import { createError } from '../../utils/error'

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
      const userRole = await Role.findOne({});
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

//export const fetchUserInfo = async (req: express.Request, res: express.Response) => {
//  try {
//    const accessToken = req.cookies["access_token"];
//
//    if (!accessToken) {
//      console.log('access token not found');
//      return res.status(401).json({ error: 'no bueno'}).end();
//    }
//
//    //const userString = await getUserBy
//
//  } catch (error) {
//    return res.status(500).send("Server error");
//  }
//}


   
   //LOGOUT FUNCTION
   export const logout = (req: express.Request, res: express.Response) => {

    res.status(200).json({ message: 'Logout successful' });
  };
  