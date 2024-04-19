import { addToCart, deleteCartRecord, getCart, saveTransaction } from './../controllers/cart/cart.controller';
import { createProduct, fetchProducts, fetchProductsById} from './../controllers/product/products.controller';
import express from 'express';

export default (router: express.Router) => {
    //FETCH PRODUCT DATA
    router.get('/api/products', fetchProducts);
    
    //FETCH PRODUCT DATA BY ID
    router.get('/api/products/get/:id', fetchProductsById);
}