import mongoose, { Schema } from "mongoose";

export interface ICartModel {
    //USER ID (Owner of the cart) 
    ownerId: mongoose.Types.ObjectId,
    
    //PRODUCT ID (Will be populated to display product content)
    productId: mongoose.Types.ObjectId[],
}

const CartSchema = new Schema<ICartModel>({
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Users'
    },
    productId: {
        type: [{ type: Schema.Types.ObjectId, ref: "product"}],
        required: true,
        ref: 'product'
    }
});


export interface ICart extends ICartModel , Document {}

export const CartModel = mongoose.model<ICart>('cart', CartSchema);