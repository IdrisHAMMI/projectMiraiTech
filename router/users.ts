import express from 'express';
import { verifyAdmin } from './../utils/verifyToken';
import { getAllUsers, getById } from '../controllers/auth/users.controller';
import { getUsernameById } from './../utils/fetchUser';
import { createShippingAddress } from '../controllers/user-profile/profile.controller';

export default (router: express.Router) => {
  //GET ALL USER ROUTE
  router.get('auth/api/user/data/:id', verifyAdmin, getById );
  //ADDS SHIPPING ADDRESS TO USER COLLECTION
  router.post('/userprofile/shipping-address', createShippingAddress)
  //GET BY ID
  router.get('/auth/:id', getUsernameById );
};