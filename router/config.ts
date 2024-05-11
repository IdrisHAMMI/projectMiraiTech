import express from 'express';

import users from './users';
import authentication from './authentication';
import products from './products';
import admin from './admin';
import cart from './cart';
const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    products(router);
    admin(router);
    cart(router);

    return router;
};
