import mongoose from 'mongoose';

export interface ICategorySchema {
    categoryName: string,
}

//PRODUCT IDENTETY TYPE SCHEMA
const ProductTypeSchema = new mongoose.Schema(
    {
    categoryName: { 
        type: String, 
        unique: true 
    }, 
},
{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at' 
    }
});

export interface ICategoryDocument extends ICategorySchema, Document {}

export default mongoose.model('ProductCategory', ProductTypeSchema);