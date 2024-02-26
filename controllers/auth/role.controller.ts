import express from 'express';
import Role from '../../models/role.model'


export const newRole = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        if(req.body.role && req.body.role !== ''){
            const newRole = new Role(req.body);
            await newRole.save();
            return res.send("Role Created!");
        } else {
            return res.status(400).send("Bad Request! (ROLE FUNCTION)");
        }
    } catch (error) {
        return res.status(500).send("Internal Server Error!");
    }
};

export const updateUserRole = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
 try {
    const role = await Role.findById({_id: req.params.id});
    if(role) {
        const newData = await Role.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        return res.status(200).send("Role Updated!")
    } else {
        return res.status(404).send("Role not found!")
    }
 } catch (error) {
    return res.status(500).send("Internal Server Error!");

 }
};