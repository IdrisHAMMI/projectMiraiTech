import { UserModel } from './../../models/users.model';
import { Request, Response, NextFunction } from 'express';

export const createShippingAddress = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Retrieve UID from local storage
        const uid = req.headers.uid; // Assuming the UID is sent in headers
                
        if (!uid) {
            res.status(400).json({ error: 'UID not provided in headers' });
            return;
        }

        // Find the user by UID
        const user = await UserModel.findById(uid);

        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Extract shipping address data from request body
        const { firstName, lastName, roadAddress, additionalAddress, postalCode, city, country, phoneNumber, secondaryPhoneNumber } = req.body;

        // Update user's shippingAddress
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