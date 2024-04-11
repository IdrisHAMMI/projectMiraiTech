import { addToCart, deleteCartRecord, getCart } from './../controllers/cart/cart.controller';
import { createProduct, fetchProducts, fetchProductsById} from './../controllers/product/products.controller';
import express from 'express';

export default (router: express.Router) => {
    //FETCH PRODUCT DATA
    router.get('/api/products', fetchProducts);
    
    //FETCH PRODUCT DATA BY ID
    router.get('/api/products/get/:id', fetchProductsById);

    //ADD CHOSEN PRODUCT TO USER
    router.post('/api/cart/add/:id', addToCart)
    
    //ADD CHOSEN PRODUCT TO USER
    router.get('/api/cart/get/:id', getCart)

    //DELETE CART ITEM
    router.delete('/api/cart/:id/delete/:productId', deleteCartRecord)
}