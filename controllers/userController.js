const express = require('express');
const router = express.Router();
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



// POST REQUEST TO ADD NEW USER TO DB
router.post('/', async (req, res) => {
  try {
    const usrObject = new Users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    const newUser = await usrObject.save();
    res.send(newUser);
  } catch (err) {
    console.log('Error in Users Save:' + JSON.stringify(err, undefined, 2));
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
