import { ICategoryDocument } from './../../models/category.model';
import { TransactionModel } from './../../models/transaction.model';
import express from 'express' 
import { CartModel } from '../../models/cart.model';

//ADD PRODUCTS TO CART MODEL API
export const addToCart = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { ownerId, productId } = req.body;

        let cart = await CartModel.findOne({ ownerId });

        if (cart) {
            // CHECK IF THE PRODUCT ALREADY EXISTS IN THE CART
            const existingItem = cart.items.find(item => item.productId.equals(productId));
            if (existingItem) {
                // IF THE PRODUCT EXISTS, INCREMENT ITS QUANTITY
                existingItem.quantity++;
            } else {
                // IF THE PRODUCT DOESNT EXIST, THEN ADD A NEW ENTRY W/ NEW DATA
                cart.items.push({ productId, quantity: 1 });
            }
        } else {
            // IF THE CART DOESNT EXIST THEN CREATE A NEW ONE
            cart = new CartModel({
                ownerId,
                items: [{ productId, quantity: 1 }]
            });
        }

        const savedCart = await cart.save();

        return res.status(201).json(savedCart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ error: 'An error occurred while adding the product to cart' });
    }
};



//FETCH CART DATA API
export const getCart = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const ownerId = req.params.id; // USER ID IN CART MODEL

        // FIND THE CART DOCUMENT FOR THE DESIGNATED USER
        const cart = await CartModel.findOne({ ownerId }).populate('items.productId')

        return res.json(cart);
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.status(500).json({ error: 'An error occurred while fetching cart' });
    }
    
};

//DELETE CART DATA API
export const deleteCartRecord = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const ownerId = req.params.id; 
        const productId = req.params.productId;

        // Find the cart document for the designated user and update it
        const cart = await CartModel.findOneAndUpdate(
            { ownerId },
            { $pull: { items: { productId } } }, // Remove the specified product from the items array
            { new: true } // Return the updated document
        );

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        return res.json(cart);
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        return res.status(500).json({ error: 'An error occurred while deleting product from cart' });
    }
}

//DELETE CART DATA API
export const deleteAllCartRecords = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const ownerId = req.params.id; 

        // Find the cart document for the designated user and update it
        const cart = await CartModel.findOneAndUpdate(
            { ownerId },
            { $set: { items: [] } }, // Set the items array to an empty array to remove all items
            { new: true } // Return the updated document
        );

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        return res.json(cart);
    } catch (error) {
        console.error('Error deleting all cart records:', error);
        return res.status(500).json({ error: 'An error occurred while deleting all cart records' });
    }
}

export const updateQuantity = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {

      const { productId, ownerId } = req.params; 
      const { quantity } = req.body;
  
      console.log(`Owner ID: ${ownerId}, Product ID: ${productId}, New Quantity: ${quantity}`);
  
      // FIND THE CART THAT CONTAINS THIS PRODUCT FOR THE SPECIFIC OWNER
      const cart = await CartModel.findOne({ ownerId, 'items.productId': productId });
      if (!cart) {
        console.log('Cart not found for ownerId:', ownerId, 'and productId:', productId);
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      console.log('Cart found:', cart);
  
      // UPDATE THE QUANTITY OF THE SPECIFIC PRODUCT
      const item = cart.items.find(item => item.productId.toString() === productId);
      if (!item) {
        console.log('Item not found in cart for productId:', productId);
        return res.status(404).json({ error: 'Item not found in cart' });
      }
  
      item.quantity = quantity;
  
      // SAVE THE CART
      await cart.save();
  
      console.log('Updated Cart:', cart);
  
      return res.status(200).json(cart);
  
    } catch (err) {
      console.error('Error updating product quantity:', err);
      return res.status(500).json({ error: 'An error occurred while updating product quantity' });
    }
  };

//API TO WRITE THE TRANSACTION INFORMATION
export const saveTransaction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { ownerId, paypalTransactionId, name, quantity, totalPrice } = req.body;
        
        const transaction = new TransactionModel({
          ownerId,
          paypalTransactionId,
          totalPrice,
          items: [{ name, quantity} ] 
        });
    
        const savedTransaction = await transaction.save();
    
        res.status(201).json(savedTransaction);
      } catch (error) {
        console.error('Error saving transaction:', error);
        res.status(500).json({ error: 'An error occurred while saving the transaction' });
      }
    };