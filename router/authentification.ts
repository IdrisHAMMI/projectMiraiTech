import express from 'express';

import { register, login } from '../controllers/userController';

export default (router: express.Router) => {
    router.post('/auth/register', register);
    router.get('/auth/login', login);
};