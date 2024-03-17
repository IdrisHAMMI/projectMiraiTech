import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export interface IUserModel {
    username: string;
    email: string;
    password: string;
    shippingAddress: {
        firstName: string;
        lastName: string;
        roadAddress: string;
        additionalAddress: string;
        postalCode: string;
        city: string;
        country: string;
        phoneNumber: string;
        secondaryPhoneNumber: string;
    };
    isAdmin: boolean; 
    roles: mongoose.Types.ObjectId[]; 
}

const UserSchema = new Schema<IUserModel>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    shippingAddress: {
        firstName: { type: String },
        lastName: { type: String },
        roadAddress: { type: String },
        additionalAddress: { type: String },
        postalCode: { type: String },
        city: { type: String },
        country: { type: String },
        phoneNumber: { type: String },
        secondaryPhoneNumber: { type: String },
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    roles: {
        type: [{ type: Schema.Types.ObjectId, ref: "Role" }],
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export interface IUserModelEx extends IUserModel, Document {}

export const UserModel = mongoose.model<IUserModel>('Users', UserSchema);

export const getUsers = () => UserModel.find();

export const getUserByEmail = (email: string) => UserModel.findOne({ email });


//GETS THE USER VIA THEIR OBJECT ID
export const getUserById = (id: string) => UserModel.findById(id);
//CREATES USER
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());

//DELETES A USER
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });