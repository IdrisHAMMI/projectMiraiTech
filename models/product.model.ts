import mongoose, { Schema, Document, Types} from 'mongoose';

export interface IProductModel {
    productName: string;
    productDescription: string;
    productStock: number;
    productBrand: Types.ObjectId;
    productCategory: Types.ObjectId;
    productPrice: number;
    productImageURL: string;
}

const ProductSchema = new Schema<IProductModel>({
    productName : {type : String, required: true, unique: true },
    productDescription : {type : String},
    productStock: {type: Number, min: 0, max: 255},
    productBrand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    productCategory: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
    productPrice : {type: Number, default: 0},
    productImageURL: { type: String, required: true }
})
export interface IProductDocument extends IProductModel, Document {}

export const ProductModel = mongoose.model<IProductDocument>('product', ProductSchema);

export const deleteProductById = (id: string) => ProductModel.findOneAndDelete({ _id: id });