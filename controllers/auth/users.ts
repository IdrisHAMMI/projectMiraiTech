import express from 'express';

import { deleteUserById, getUsers, getUserById } from '../../models/users.model';
import { getUserBySessionToken } from '../../models/users.model'; 


//FETCH ALL USER (THIS WILL ONLY BE USED FOR DEBUGGING/ADMIN PURPOSES) ((THIS IS ALSO A MASSIVE SECURITY FLAW, NEED TO FIND AN ALTERNATIVE))
export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
 
    if (!users) {
      console.log('No users found');
      return res.status(404).json({ error: 'No users found' }).end();
    }
 
    return res.status(200).json(users);
  } catch (error) {
    console.log('Error retrieving users:', error);
    return res.status(500).json({ error: 'An internal server error occurred' }).end();
  }
 };
 
 //THIS FUNCTION FETCHES THE USER'S INFORMATION VIA CROSSREFFERENCING THE SESSION TOKEN STORED IN THE COOKIE.
 //IF THE BACKEND SESSION TOKEN THE SAME AS THE ONE THAT THE USER LOGGED IN WITH, THEN DISPLAY USER DATA 
 export const getLoggedInUser = async (req: express.Request, res: express.Response) => {
  try {
    //FETCHES THE SESSION TOKEN
    const sessionToken = req.cookies['SECRETKEY_STRING'];

    if (!sessionToken) {
      //IF THE SESSION TOKEN IS NOT FOUND, RETURN AN UNAUTHORIZED ERROR
      console.log('Session token not found');
      return res.status(401).json({ error: 'Unauthorized' }).end();
    }

    //USE THE SESSION TOKEN TO RETRIEVE THE USER'S INFORMATION FROM THE BACKEND
    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      //IF THE USER IS NOT FOUND, RETURN A 404 ERROR
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' }).end();
    }
    //IF EVERYTHING IS SUCCESSFUL, RETURN THE USER'S DATA
    return res.status(200).json({ username: user.username });
  } catch (error) {
    console.log('Error retrieving user:', error);
    return res.status(500).json({ error: 'An internal server error occurred' }).end();
  }
};

 //DELETES USER FROM DB (IS USED IN USER PROFILE PAGE OR ADMIN PANEL)
 export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
 
    if (!id) {
      console.log('Missing user ID');
      return res.status(400).json({ error: 'Missing user ID' }).end();
    }
 
    const deletedUser = await deleteUserById(id);
 
    if (!deletedUser) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' }).end();
    }
 
    return res.json(deletedUser);
  } catch (error) {
    console.log('Error deleting user:', error);
    return res.status(500).json({ error: 'An internal server error occurred' }).end();
  }
 }
 
 //UPDATES USER DATA (IS USED IN USER PROFILE)
 export const updateUser = async (req: express.Request, res: express.Response) => {
  try {
     const user = req.locals.user;
     const { shippingDetails } = req.body;
  
     if (!user || !shippingDetails) {
       console.log('Missing user or shipping details');
       return res.status(400).json({ error: 'Missing user or shipping details' }).end();
     }
  
     user.shippingDetails = shippingDetails;
     await user.save();
  
     return res.status(200).json(user).end();
  } catch (error) {
     console.log('Error updating user:', error);
     return res.status(500).json({ error: 'An internal server error occurred' }).end();
  }
 }
 