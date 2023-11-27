const mongoose = require('mongoose');

var cartStatus = mongoose.model('Users' , {
  itemName: { type: String },
  itemDesc: { type: String },
  price: { type: String }
});

module.exports = { cartStatus };
