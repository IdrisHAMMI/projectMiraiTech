const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const app = require('../server.js');
const bcrypt = require('bcryptjs')

const { Users } = require('../models/users');

////////////////////SIGN UP ROUTE////////////////////

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // PASSWORD ENCRYPTION
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const record = await Users.findOne({ email: email });

    // IF THE EMAIL IS ALREADY REGISTERED, SEND ERROR MESSAGE.
    // ELSE, POST INFO TO DATABASE
    if (record) {
      return res.status(400).send({
        message: "Email is already registered."
      });
    } else {
      // USER SCHEMA
      const user = new Users({
        username: username,
        email: email,
        password: hashedPassword
      });

      const result = await user.save();

      // JWT TOKEN

      const { _id } = await result.toJSON();
      const token = jwt.sign({ _id: _id }, "SECRETPLACEHOLDER");
      res.cookie("jwt", token, {
        httpOnly: true,
        // COOKIE EXPIRATION = 1 DAY
        maxAge: 24 * 60 * 60 * 100
      });

      res.json({
        user: result
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
////////////////////SIGN UP ROUTE////////////////////


router.post("/login", (req, res) => {
  res.send("login user");
});

router.get('/user', (req, res) => {
  res.send("user info");
});

module.exports = router;
