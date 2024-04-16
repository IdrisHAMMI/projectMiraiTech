import express from 'express';
import { verifyAdmin } from './../utils/verifyToken';
import { getAllUsers, getById, updateEmailProfile } from '../controllers/auth/users.controller';
import { createShippingAddress } from '../controllers/user-profile/profile.controller';

export default (router: express.Router) => {
  //GET ALL USER ROUTE
  router.get('auth/api/user/data/:id', verifyAdmin, getById );
  //ADDS SHIPPING ADDRESS TO USER COLLECTION
  router.post('/userprofile/shipping-address', createShippingAddress);
  //GET USER BY ID
  router.get('/auth/user/:id', getById);
  //UPDATE USER EMAIL FROM PROFILE
  router.put('/auth/user/profile/update/:id', updateEmailProfile)
};