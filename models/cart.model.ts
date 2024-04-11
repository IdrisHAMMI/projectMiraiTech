import mongoose, { Schema, Document } from "mongoose";


export interface CartItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
}

export interface ICartModel {
    // USER ID (Owner of the cart) 
    ownerId: mongoose.Types.ObjectId;
    
    // ARRAY OF CART ITEMS (Inside that array will be the Products)
    items: CartItem[];
}

export const CartSchema = new Schema<ICartModel>({
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Users'
    },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: "product" },
            quantity: { type: Number, default: 1 } // DEFAULT QUANTITY IS 1
        }
    ]
});


export interface ICart extends ICartModel, Document {}

export const CartModel = mongoose.model<ICart>('Cart', CartSchema);