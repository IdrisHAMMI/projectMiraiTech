const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { Users } = require('../models/users');

// GET REQUEST TO FETCH USERS FROM DB
// router.get('/', async (req, res) => {
  // try {
    // const docs = await Users.find().exec();
    // res.send(docs);
  // } catch (err) {
    // console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
    // res.status(500).json({ error: 'Internal Server Error' });
  // }
// });


//CALLBACK BY ID
//USAGE EXAMPLE = localhost:3000/users/"id"
//router.get('/:id', async (req, res) => {
//  if (!ObjectId.isValid(req.params.id))
//    return res.status(400).send(`No record with given id: ${req.params.id}`);
//
//  try {
//    const doc = await Users.findById(req.params.id).exec();
//    if (doc) {
//      res.send(doc);
//    } else {
//      res.status(404).send(`No record found with id: ${req.params.id}`);
//    }
//  } catch (err) {
//    console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//});



// POST REQUEST TO ADD NEW USER TO DB
router.post("/register", async (req, res) => {
  try {
  const { username, email, password } = req.body;


  const salt = await bcrypt.genSalt(10)
  //HASHES PASSWORD
  const hashedPassword = await bcrypt.hash(password,salt)

  const hashedSignup = new Users({
    username,
    email,
    password: hashedPassword
  })

  const result = await hashedSignup.save();

  //JWT TOKEN
  const {_id} = await result.toJSON()
  const token = jwt.sign({_id:_id}, "secret")
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

    
    res.send(result);
  } catch (err) {
    console.log('Error in Users Save:' + JSON.stringify(err, undefined, 2));
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//FINDS THE ID UPDATES IT
//router.put('/:id', async (req, res) => {
//  if (!ObjectId.isValid(req.params.id))
//    return res.status(400).send(`No record with given id: ${req.params.id}`);
//
//  const usrObject = {
//    username: req.body.username,
//    email: req.body.email,
//    password: req.body.password
//  };
//
//  try {
//    const updatedUser = await Users.findByIdAndUpdate(
//      req.params.id,
//      { $set: usrObject },
//      { new: true }
//    ).exec();
//
//    if (updatedUser) {
//      res.send(updatedUser);
//    } else {
//      res.status(404).send(`No record found with id: ${req.params.id}`);
//    }
//  } catch (err) {
//    console.log('Error in Users Update: ' + JSON.stringify(err, undefined, 2));
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//});

//router.delete('/:id', async (req, res) => {
//  try {
//    if (!ObjectId.isValid(req.params.id))
//      return res.status(400).send(`No record with given id: ${req.params.id}`);
//    const doc = await Users.findByIdAndDelete(req.params.id);
//    res.send(doc)
//  } catch(err) {
//    console.log('Error in the Users Delete:' +JSON.stringify(err, undefined, 2));
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//})


router.post("/login", async (req,res) => {
  const user = await Users.findOne({email: req.body.email})
 
  if(!user){
    return res.status(404).send({
      message: "User not found"
    });
  }

  if(!(await bcrypt.compare(req.body.password, user.password))){
    return res.status(400).send({
      message: "pass is no bueno"
    });
  }

  const token = jwt.sign({_id:user._id}, "secret")
  res.cookie("jwt",token,{
    httpOnly:true,
    maxAge: 24 * 60 * 60 * 1000,
  })
  res.send({
    message: "bueno"
  });
})

// GET USER INFO
router.get("/users", async (req, res) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return res.status(401).send({
        message: "unauthenticated",
      });
    }

    const user = await Users.findOne({ _id: claims._id });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const { password, ...data } = await user.toJSON();
    res.send(data);
  } catch (err) {
    return res.status(401).send({
      message: 'unauthenticated',
    });
  }
});

router.post('/logout', (req, res) => {
  try {
    // Clear the JWT cookie
    res.cookie('jwt', '', { maxAge: 0, httpOnly: true });

    // Optionally: perform additional cleanup or invalidate the JWT on the server

    res.status(200).send({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});


module.exports = router;