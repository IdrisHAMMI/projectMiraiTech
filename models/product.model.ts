import mongoose, { Schema, Document} from 'mongoose';

interface IProductReview {
    productName: string;
    productDescription: string;
    productStock: number;
    productBrand: string;
    productPrice: number;
    productImageURL: string;
}

interface IProductReviewDocument extends IProductReview, Document {}

const productPreview = new Schema<IProductReviewDocument>({
    productName : {type : String, unique: true },
    productDescription : {type : String},
    productStock: {type: Number},
    productBrand: {type : String},
    productPrice : {type: Number},
    productImageURL: { type: String }
})

export default mongoose.model<IProductReviewDocument>('productPreview', productPreview);