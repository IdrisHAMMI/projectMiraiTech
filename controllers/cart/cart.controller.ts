import express from 'express' 
import { CartModel } from '../../models/cart.model';

export const addToCart = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { productId, ownerId } = req.body;

        const cart = new CartModel({
            ownerId,
            productId
        })

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

        // Find the cart documents for the specified user
        const cart = await CartModel.find({ ownerId }).populate('productId');

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ error: 'An error occurred while fetching cart' });
    }
};