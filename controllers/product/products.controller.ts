import express from 'express' 
import IProductReviewDocument from '../../models/product.model'

export const createProduct = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        
        const { productName, productDescription, productStock, productBrand, productPrice, productImageURL } = req.body;
        const newProduct = new IProductReviewDocument ({
            productName,
            productDescription,
            productStock,
            productBrand,
            productPrice,
            productImageURL
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch(error) {
        console.error('Error creating product:', error);
        //DUPLICATE KEY ERROR (Error displays when creating the same request with the same exact value of the product name twice)
        res.status(500).json({ error: 'An error occurred while creating the product' });
    }
}

export const fetchProducts = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const products = await IProductReviewDocument.find();
        res.json(products); // Sending back the fetched products
    } catch (error) {
        console.error('CANT FETCH PRODUCTS', error);
        res.status(500).json({error: 'Internal Error'});
    }
}
