import express from 'express';
import { getAllUsers } from './../controllers/auth/users.controller';


export default (router: express.Router) => {
  //GET USERS (ADMIN)
  router.get('/api/admin/data/users', getAllUsers)
  //GET PRODUCTS
  //TO BE ADDED//
  
  //ADD PRODUCTS
  //TO BE ADDED//
};

