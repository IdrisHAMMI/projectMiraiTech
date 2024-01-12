import {FilterQuery} from "mongoose";
import Users, {UserDocument} from './../../models/users.model';

export async function createUser(
  input: Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
) {
  try {
    return await Users.create(input);
   
  } catch (e: any) {
    throw new Error(e);
  }
}