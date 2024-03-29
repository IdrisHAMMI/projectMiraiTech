import mongoose from 'mongoose';


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
}
);

export default mongoose.model('Brand', BrandSchema);