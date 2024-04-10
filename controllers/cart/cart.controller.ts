import express from 'express' 
import { CartModel } from '../../models/cart.model';

export const addToCart = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {  ownerId , productId} = req.body;

        let cart = await CartModel.findOne({ ownerId });

        if (cart) {
            // IF A CART ENTRY ALREADY EXISTS, THEN POST ONLY THE ADDED PRODUCT TO THE ARRAY
            cart.productId.push(productId);
        } else {
            // ELSE IF THE ENTRY DOESNT EXIST, CREATE A NEW ONE
            cart = new CartModel({
                ownerId,
                productId: [productId] //INIT PRODUCT ID ARRAY WITH THE NEW PROD ID 
            });
        }
        //SAVES THE CART DATA
        const savedCart = await cart.save();

        if(!savedCart) {
            console.log('cant find user id')
        }

        return res.status(201).json(savedCart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ error: 'An error occurred while adding the product to cart' });
    
        };
}

export const getCart = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const ownerId = req.params.id; //USER ID IN CART MODEL

        // FIND THE CART DOCUMENT FOR THE DESIGNATED USER
        const cart = await CartModel.find({ ownerId }).populate('productId').populate('ownerId');

        return res.json( cart );
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ error: 'An error occurred while fetching cart' });
    }
};