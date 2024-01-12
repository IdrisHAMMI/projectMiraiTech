import express, { Request, Response } from "express";
import config = require("config");
import connect from "../utils/connect";
import routes from './routes';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import { createUserHandler } from "../controllers/userController";

const port = config.get<number>('port')

const app = express(); // EXPRESS INSTANCE

// BODY PARSER MIDDLEWARE TO PARSE JSON REQUESTS
app.use(express.json());

app.use(cookieParser());

// CORS ("CROSS ORIGIN RESOURCE SHARING") ENABLER
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:4200',
  })
);

// CONTROLLERS
//import productRoutes from '../controllers/productController';

// TESTING SPACE
app.use('/api/auth', createUserHandler);
//app.use('/api/items', productRoutes);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// NULL ENDPOINT ERROR
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// SERVER START
app.listen(port, async () => {
  console.log(`Server is running on port ${port}. URL: http://localhost:${port}`);

  await connect();

  routes(app)
});
