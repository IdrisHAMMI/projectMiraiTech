import mongoose from 'mongoose';

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
}
);

export default mongoose.model('ProductCategory', ProductTypeSchema);