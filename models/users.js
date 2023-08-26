const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

// Define the comparePassword method
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

var Users = mongoose.model('Users', userSchema);

module.exports = { Users };
