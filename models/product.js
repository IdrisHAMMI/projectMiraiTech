const mongoose = require ('mongoose');

var productPreview = new mongoose.Schema({
    productId: {type : Number},
    productName : {type : String, unique: true },
    productDescription : {type : String},
    productPrice : {type: Number},
    productImageURL: { type: String }
})

const ProductPreview = mongoose.model('productPreview', productPreview);

module.exports = { productPreview };