import { verifyAdmin } from './../utils/verifyToken';
import express from 'express';
import { getById } from './../controllers/auth/users';
import { getUsernameById } from './../utils/fetchUser';
import { fetchProducts } from './../controllers/auth/products.controller';
//import { getCurrentUser } from './../src/middleware/fetchUser';

export default (router: express.Router) => {
  //GET ALL USER ROUTE
  router.get('auth/api/user/data/:id', verifyAdmin, getById );

  //GET BY ID
  router.get('/auth/:id', getUsernameById );

  router.get('/api/products', fetchProducts)
};

