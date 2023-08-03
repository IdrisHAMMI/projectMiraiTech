const express = require('express');
const router = express.Router();

const { Users } = require('../models/users');


//CALLBACK QUERY & ROUTE HANDLER
//URL => localhost:3000/users
router.get('/', async (req, res) => {
  try {
    const docs = await Users.find().exec();
    res.send(docs);
  } catch (err) {
    console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', (req, res) => {

  var usrObject = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  usrObject.save((err, doc) => {
    if(!err) {res.send(doc); }
    else { console.log('Error in Users Save:' + JSON.stringify(err,undefined,2 )) ;}
  });
});

module.exports = router;
