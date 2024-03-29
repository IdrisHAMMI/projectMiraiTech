import express from 'express';

import users from './users';
import authentication from './authentication';
import products from './products';
import admin from './admin';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    products(router);
    admin(router);
    
    return router;
}