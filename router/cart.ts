import express from 'express';
import { addToCart, deleteCartRecord, deleteAllCartRecords, getCart, saveTransaction } from './../controllers/cart/cart.controller';

export default (router: express.Router) => {

    //ADD CHOSEN PRODUCT TO USER
    router.post('/api/cart/add/:id', addToCart)
    
    //ADD CHOSEN PRODUCT TO USER
    router.get('/api/cart/get/:id', getCart)

    //DELETE CART ITEM
    router.delete('/api/cart/:id/delete/:productId', deleteCartRecord);
    
    //SAVES TRANSACTION DATA
    router.post('/api/cart/transaction/success/post/:id', saveTransaction)

    //DELETES ALL CART ITEMS
    router.delete('/api/cart/delete/all/:id', deleteAllCartRecords);

};

