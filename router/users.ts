import { verifyAdmin, verifyUser } from './../utils/verifyToken';
import express from 'express';

import { login } from './../controllers/auth/authentication.controller'
import { getUserByJWTToken } from './../models/users.model';
import { getAllUsers, getById } from './../controllers/auth/users';


export default (router: express.Router) => {
  //GET ALL USER ROUTE
  router.get('/', verifyAdmin, getAllUsers );
  //GET BY ID
  router.get('/:id', verifyUser, getById );

  router.get('/api/user', verifyUser)
  //router.get('/users', getUserByJWTToken);
  //router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  //router.patch('/updateUser', isAuthenticated, updateUser);
  //router.post('/logout', isAuthenticated);
};