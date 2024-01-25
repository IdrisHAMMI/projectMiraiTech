import express from "express";
import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../../models/users.model'

//CHECKS IF THE USER IS AUTHENTICATED w/ THE SESSION TOKEN (This token is supposed to be kept in a safe place, for this project it will stay inside this script)
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        // 
        const sessionToken = req.cookies['SECRETKEY_STRING'];
        //IF THERE ARE NO SESSION TOKEN, SENDS 403 Forbidden
        if (!sessionToken) {
            console.log('SESSION TOKEN NOT VALID');
            return res.sendStatus(403);
        }
        //FETCHES THE USER VIA THE SESSION TOKEN
        const existingUser = await getUserBySessionToken(sessionToken);
        //IF THE USER DOES NOT EXIST, SENDS 403 Forbidden
        if(!existingUser) {
            console.log('NO USER EXISTS IN DB');
            return res.sendStatus(403);
        }
        //MERGES IDENTITY INTO THE REQUEST(req) OBJECT
        merge(req, { identity: existingUser});
        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction)=> {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            res.sendStatus(400);
            return;
        }

        if (currentUserId.toString() !== id) {
            res.sendStatus(403);
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};