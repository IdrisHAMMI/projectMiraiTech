const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true},
  password: { type: String, required: true },
});

var Users = mongoose.model('Users', userSchema);

module.exports = { Users };
