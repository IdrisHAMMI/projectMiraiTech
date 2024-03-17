import express from 'express';

import { register, login, registerAdmin, sendEmail, resetPassword } from '../controllers/auth/authentication.controller';
import { newRole } from '../controllers/auth/role.controller';

export default (router: express.Router) => {
    //ADD NEW ROLE
    router.post('/auth/role', newRole)
    //REGISTER USER
    router.post('/auth/register', register);
    //REGISTER ADMIN
    router.post('/auth/register-admin', registerAdmin);    
    //LOGIN USER
    router.post('/auth/login', login);
    //PASSWORD RECOVERY EMAIL ROUTE
    router.post('/auth/send-email', sendEmail)
    //PASSWORD RECOVERY RESET ROUTE
    router.post('/auth/reset-password', resetPassword)
};