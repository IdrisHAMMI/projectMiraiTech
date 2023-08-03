const mongoose = require('mongoose');

var Users = mongoose.model('Users' , {
  username: { type: String },
  email: { type: String},
  password: { type: String}
});

module.exports = { Users };
