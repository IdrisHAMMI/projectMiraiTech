import { createProduct } from './../controllers/product/products.controller';
import express from 'express';

export default (router: express.Router) => {
    router.post('/api/products/newProduct', createProduct)
}