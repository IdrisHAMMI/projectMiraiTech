import express from 'express';
import { verifyAdmin } from './../utils/verifyToken';
import { getById } from '../controllers/auth/users.controller';
import { getUsernameById } from './../utils/fetchUser';
import { fetchProducts } from '../controllers/product/products.controller';

export default (router: express.Router) => {
  //GET ALL USER ROUTE
  router.get('auth/api/user/data/:id', verifyAdmin, getById );

  //GET BY ID
  router.get('/auth/:id', getUsernameById );

  router.get('/api/products', fetchProducts)

};

