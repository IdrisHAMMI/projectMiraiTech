import mongoose from 'mongoose';

export interface IBrandSchema {
    brandName: string;
}


const BrandSchema = new mongoose.Schema(
    {
    brandName: { 
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
export interface IBrandDocument extends IBrandSchema, Document {}

export const BrandModel = mongoose.model<IBrandSchema>('Brand', BrandSchema);