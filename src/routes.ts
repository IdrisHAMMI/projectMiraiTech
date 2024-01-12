import { Express, Request, Response } from "express";
import { createUserHandler } from "controllers/userController";
import validateResource from './middleware/validateResource'
import { createUserSchema } from "./schema/users.schema";

function routes(app: Express){
app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
app.get("/api/users", validateResource(createUserSchema), createUserHandler)
}

export default routes;