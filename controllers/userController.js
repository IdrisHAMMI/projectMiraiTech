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

      const {password, ...data} = await result.toJSON()
      // JWT TOKEN

      const { _id } = await result.toJSON();
      const token = jwt.sign({_id:_id }, "test");
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

////////////////////LOGIN ROUTE///////////////////////
router.post("/login", async(req, res) => {
  const user = await Users.findOne({email:req.body.email})
  if(!user){
    return res.status(404).send({
      message:"User not found"
    })
  }
  if(!await bcrypt.compare(req.body.password, user.password)){
    return res.status(400).send({
      message: "Password is incorrect"
    })
  }

  const token = jwt.sign({_id: user._id}, "secret")

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24*60*60*1000 //1 DAY TOKEN
  })
});


////////////////////USER ROUTE///////////////////////

router.get('/user', async (req, res) => {

  //TRY TO VERIFY JWT(cookie)SECRET PASSWORD
  //IF IT IS THE SAME/VALID, FIND THE USER ID
  //AND SEND THE DATA, IF NOT THROW ERROR

  try {
  const cookie = req.cookies['jwt']

  const claims = jwt.verify(cookie, 'secret')

  if (!claims) {
    return res.status(401).send({
      message: 'Unauthenticated'
    })
  }

const user = await Users.findOne({_id: claims._id})

const {password, ...data} = await user.toJSON()

  res.send(data)

} catch (e) {
  return res.status(401).send({
    message: 'Unauthenticated'
    })
  }
})

router.post('/logout', (req, res) => {

  //RENDERS THE JWT TOKEN TIME LIMIT TO 0
  //TO MAKE THE USER LOG OUT OF SESSION

  res.cookie("jwt", "", { maxAge: 0 });
  res.send({
    message: "logged out successfully!"
  });
});

module.exports = router;
