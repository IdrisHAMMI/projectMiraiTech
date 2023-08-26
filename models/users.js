const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsersSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

// Add a method to the schema to compare passwords
UsersSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const Users = mongoose.model('Users', UsersSchema);

module.exports = { Users };
