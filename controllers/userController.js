if (process.env.NODE_ENV !== 'prodcution') {
  require('dotenv').config({path: '../.env'})
}

//EXPRESS, MONGOOSE & JWT WEB TOKEN DEPENDENCIES
const express = require('express')
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')




//USER MONGOOSE MODEL
const { Users } = require('../models/users');

// GET REQUEST TO FETCH USERS FROM DB
router.get('/', async (req, res) => {
  try {
    const docs = await Users.find().exec();
    res.send(docs);
  } catch (err) {
    console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//CALLBACK BY ID (DEBUGING)
//USAGE EXAMPLE = localhost:3000/users/"input id of account"
router.get('/:id', async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);

  try {
    const doc = await Users.findById(req.params.id).exec();
    if (doc) {
      res.send(doc);
    } else {
      res.status(404).send(`No record found with id: ${req.params.id}`);
    }
  } catch (err) {
    console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



////////////DISABLED FOR NOW////////////////
//
//
// POST REQUEST TO ADD NEW USER TO DB
//router.post('/', async (req, res) => {
//  try {
//    const usrObject = new Users({
//      username: req.body.username,
//      email: req.body.email,
//      password: req.body.password
//    });
//    const newUser = await usrObject.save();
//
//    res.send(newUser);
//  } catch (err) {
//    console.log('Error in Users Save:' + JSON.stringify(err, undefined, 2));
//    res.status(500).json({ error: 'Internal Server Error' });
//  }
//  console.log(Users)
//});
//
//
////FINDS THE ID UPDATES IT
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
//
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

module.exports = router;
