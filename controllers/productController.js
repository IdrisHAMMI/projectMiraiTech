const express = require('express');
const router = express.Router();
//var ObjectId = require('mongoose').Types.ObjectId;

const { productPreview } = require('../models/product.js');

// GET REQUEST TO FETCH USERS FROM DB
router.get('/', async (req, res) => {
    try {
      const products = await productPreview.find().exec();
      res.json(products);
    } catch (err) {
      console.log('Error in retrieving productPreview: ' + JSON.stringify(err, undefined, 2));
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const productObject = new productPreview({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productImageURL: req.body.productImageURL
      });
      const newProduct = await usrObject.save();
  
      res.send(newProduct);
    } catch (err) {
      console.log('Error in Users Save:' + JSON.stringify(err, undefined, 2));
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;