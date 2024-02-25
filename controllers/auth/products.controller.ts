import express from 'express' 
import IProductReviewDocument from './../../models/product.model'

export const fetchProducts = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const products = await IProductReviewDocument.find();
        res.json(products); // Sending back the fetched products
    } catch (error) {
        console.error('CANT FETCH PRODUCTS', error);
        res.status(500).json({error: 'Internal Error'});
    }
}
