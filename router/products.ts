import { createProduct, fetchProducts } from './../controllers/product/products.controller';
import express from 'express';

export default (router: express.Router) => {
    //FETCH PRODUCT DATA
    router.get('/api/products', fetchProducts);
}