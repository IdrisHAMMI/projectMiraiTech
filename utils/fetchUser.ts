import express from 'express'
import { UserModel } from '../models/users.model';


export const getUsernameById = async (req: express.Request, res: express.Response): Promise<express.Response> => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' }).end();
      }
      return res.status(200).json({ username: user.username }).end();
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: 'An internal server error occurred' }).end();
    }
  };
  