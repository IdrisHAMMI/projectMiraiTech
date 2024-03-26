import express from 'express' 
import  { ProductModel, deleteProductById } from '../../models/product.model'

//CREATES PRODUCT DATA
export const createProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { productName, productDescription, productStock, productBrand, productPrice } = req.body;

        let productImageURL: string | undefined;
        if (req.file) {
            productImageURL = req.file.filename;
        }

        const newProduct = new ProductModel({
            productName,
            productDescription,
            productStock,
            productBrand,
            productPrice,
            productImageURL
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'An error occurred while creating the product' });
    }
};

// UPDATE PRODUCT DATA
export const updateProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
      
      const { productName, productDescription, productStock, productBrand, productPrice, productImageURL } = req.body;

      const updatedProduct = await ProductModel.findByIdAndUpdate(req.params._id, {
          productName,
          productDescription,
          productStock,
          productBrand,
          productPrice,
          productImageURL
      }, { new: true });

      if (!updatedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }

      return res.status(201).json(updatedProduct);
  } catch(error) {
      console.error('Error updating product:', error);
      return res.status(500).json({ error: 'An error occurred while updating the product' });
  }
}


//FECTHES PRODUCT DATA
export const fetchProducts = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const products = await ProductModel.find();
        res.json(products); // Sending back the fetched products
    } catch (error) {
        console.error('CANT FETCH PRODUCTS', error);
        res.status(500).json({error: 'Internal Error'});
    }
}

//DELETES PRODUCT FROM DB (USED FOR THE ADMIN PANEL)
export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
   
      if (!id) {
        console.log('Missing user ID');
        return res.status(400).json({ error: 'Missing user ID' }).end();
      }
   
      const deletedProduct = await deleteProductById(id);
   
      if (!deletedProduct) {
        console.log('User not found');
        return res.status(404).json({ error: 'User not found' }).end();
      }
   
      return res.json(deletedProduct);
    } catch (error) {
      console.log('Error deleting user:', error);
      return res.status(500).json({ error: 'An internal server error occurred' }).end();
    }
   }
