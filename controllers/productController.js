const express = require('express');
const router = express.Router();
const { ProductPreview } = require('../models/product');


  //POSTS PRODUCT CONTENT TO DB
  router.post('/products', async (req, res) => {
    try {

      const { productName, productDescription, 
            productStock, productBrand, productPrice,
            productImageURL } = req.body;

      const productObject = new ProductPreview({
        productName,
        productDescription,
        productStock,
        productBrand,
        productPrice,
        productImageURL,
      });
  
      const newProduct = await productObject.save();

      res.json(newProduct);
    } catch (err) {
      console.log('Error in Product Save: ' + JSON.stringify(err, undefined, 2));
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;