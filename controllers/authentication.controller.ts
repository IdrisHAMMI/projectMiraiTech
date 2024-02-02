import express from 'express';

import { getUserByEmail, createUser } from '../models/users.model';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password } = req.body;
   
      if (!email || !password) {
        return res.sendStatus(400);
      }
   
      const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
   
      if (!user) {
        return res.sendStatus(400);
      }
   
      const expectedHash = authentication(user.authentication.salt, password);
      
      if ( user.authentication.password !== expectedHash) {
        return res.sendStatus(403);
      }
   
      const salt = random();
      user.authentication.sessionToken = authentication(salt, user._id.toString());
   
      await user.save();
   
      res.cookie('SECRETKEY_STRING', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
   
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
   };
   

   //USER REGISTRATION FUNCTION
   export const register = async (req: express.Request, res: express.Response) => {
    try {
     const { email, password, username } = req.body;
   
     //IF EMAIL/PASSWORD/USERNAME HAS NO VALUE, SEND ERROR 
     if (!email || !password || !username) {
       console.log('Validation error: Missing email, password, or username');
       return res.status(400).json({ error: 'Missing email, password, or username' }).end();
     }
   

     const existingUser = await getUserByEmail(email);
     
    //IF THE EMAIL ALREADY EXISTS, SEND ERROR
     if (existingUser) {
       console.log('Database error: Email is already in use');
       return res.status(400).json({ error: 'Email is already in use' }).end();
     }
   

     const salt = random();
     const user = await createUser({
       email,
       username,
       authentication: {
         salt,
         password: authentication(salt, password),
       },
     });
   
     //IF THE USER DOES NOT EXIST, SEND ERROR
     if (!user) {
       console.log('Database error: Failed to create user');
       return res.status(500).json({ error: 'Failed to create user' }).end();
     }
   
     return res.status(200).json(user).end();
    } catch (error) {
     console.log('Internal server error:', error);
     return res.status(500).json({ error: 'An internal server error occurred' }).end();
    }
   };
   