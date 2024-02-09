import express from 'express';

import { register, login, registerAdmin } from '../controllers/auth/authentication.controller';
import { newRole } from './role';

export default (router: express.Router) => {
    router.post('/auth/role', newRole)
    router.post('/auth/register', register);
    router.post('/auth/register-admin', registerAdmin);    
    router.post('/auth/login', login);
    //router.post('/auth/logout', logout);
};