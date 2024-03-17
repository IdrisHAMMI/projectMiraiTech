import mongoose, { Schema, Document} from 'mongoose';

export interface IProductModel {
    productName: string;
    productDescription: string;
    productStock: number;
    productBrand: string;
    productPrice: number;
    productImageURL: string;
}

const ProductSchema = new Schema<IProductModel>({
    productName : {type : String, unique: true },
    productDescription : {type : String},
    productStock: {type: Number},
    productBrand: {type : String},
    productPrice : {type: Number},
    productImageURL: { type: String }
})
export interface IProductDocument extends IProductModel, Document {}

export const ProductModel = mongoose.model<IProductDocument>('product', ProductSchema);

export const deleteProductById = (id: string) => ProductModel.findOneAndDelete({ _id: id });