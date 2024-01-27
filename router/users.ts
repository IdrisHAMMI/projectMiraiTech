import express from 'express';

import { getAllUsers, getLoggedInUser, deleteUser, updateUser } from '../controllers/auth/users';
import { isAuthenticated, isOwner } from '../src/middleware';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getLoggedInUser, isOwner);
  router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
  router.patch('/updateUser', isAuthenticated, updateUser);
  router.post('/logout', isAuthenticated);
};