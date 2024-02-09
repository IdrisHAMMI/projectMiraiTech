import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at' 
        }
    } 
);


export default mongoose.model("Role", RoleSchema)