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
res.send({
  message: 'wtf it worked???'
})
});


////////////////////USER ROUTE///////////////////////

router.get('/user', async (req, res) => {
  try {
  const cookie = req.cookies['jwt']

  const claims = jwt.verify(cookie, 'secret')

  if (!claims) {
    return res.status(401).send({
      message: 'nuh uh, not working. try again buckaroo.'
    })
  }

const user = await Users.findOne({_id: claims._id})

const {password, ...data} = await user.toJSON()

  res.send(data)

} catch (e) {
  return res.status(401).send({
    message: 'unauthenticated'
    })
  }
})

router.post('/logout', (req, res) => {
  res.cookie('jwt', '', {maxAge: 0})

  res.send({
    message:'logged out'
  })
})

module.exports = router;
