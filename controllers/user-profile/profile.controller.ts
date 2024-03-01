import { UserModel } from './../../models/users.model';
import { Request, Response, NextFunction } from 'express';

export const createShippingAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // RETREVE UID FROM LOCAL STORAGE
        const uid = req.headers.uid; 
                
        if (!uid) {
            res.status(400).json({ error: 'UID not provided in headers' });
            return;
        }

        //FIND THE USER'S ID VIA THE LOCAL STORAGE'S UID HEADER
        const user = await UserModel.findById(uid);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const { firstName, lastName, roadAddress, additionalAddress, postalCode, city, country, phoneNumber, secondaryPhoneNumber } = req.body;

        user.shippingAddress = {
            firstName,
            lastName,
            roadAddress,
            additionalAddress,
            postalCode,
            city,
            country,
            phoneNumber,
            secondaryPhoneNumber
        };

        // Save the updated user document
        await user.save();

        // Respond with success message
        res.status(201).json({ message: 'Shipping address added successfully' });
    } catch (error) {
        console.error('Error creating shipping address:', error);
        res.status(500).json({ error: 'An error occurred while creating the shipping address' });
    }
};