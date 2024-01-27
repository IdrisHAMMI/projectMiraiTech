import express from 'express';

import { createShippingAddress } from '../../models/users.model';


export const addresses = async (req: express.Request, res: express.Response) => {
    try {

        const { firstName,
                lastName,
                roadAddress,
                additionalAddress,
                postalCode,
                city,
                country,
                phoneNumber,
                secondaryPhoneNumber } = req.body;
        
        const address = await createShippingAddress({
            address:{
                firstName,
                lastName,
                roadAddress,
                additionalAddress,
                postalCode,
                city,
                country,
                phoneNumber,
                secondaryPhoneNumber 
            }
        })

        // Send the created address back in the response
        res.json(address);
    } catch(e) {
        // Log the error and send a response indicating failure
        console.error(e);
        res.status(500).send({ message: 'Failed to create address' });
    }
}
