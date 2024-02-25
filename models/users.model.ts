import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },

  userInfo: {
      firstName: { type: String },
      lastName: { type: String },
      birthday: { type: Date },
  },
  shippingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      roadAddress: { type: String },
      additionalAddress: { type: String },
      postalCode: { type: Number },
      city: { type: String },
      country: { type: String },
      phoneNumber: { type: Number },
      secondaryPhoneNumber: { type: Number },
  },
  billingAddress: {
      firstName: { type: String },
      lastName: { type: String },
      roadAddress: { type: String },
      additionalAddress: { type: String },
      postalCode: { type: Number },
      city: { type: String },
      country: { type: String },
      phoneNumber: { type: Number },
      secondaryPhoneNumber: { type: Number },
  },
  isAdmin: {
      type: Boolean,
      default: false
  },
  roles: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "Role"
  },
 }, {
     timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at'
     }
 });
 
   

export const UserModel = mongoose.model('Users', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });


//GETS THE USER VIA THEIR OBJECT ID
export const getUserById = (id: string) => UserModel.findById(id);
//CREATES USER
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
//CREATES SHIPPING ADDRESS
export const createShippingAddress = (values: Record<string, any>) => {
  return new UserModel(values).save().then((user) => user.toObject());
 } 
//DELETES A USER
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
//UPDATES USER INFORMATION
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);