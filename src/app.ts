import express from "express";
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from "mongoose";
import router from "../router/config";
import path from 'path';

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',  // Replace with the actual origin of your Angular app
  credentials: true,
}));


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);


server.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
})


const MONGO_URL = "mongodb+srv://hammiidris:j2c1ivpAj5JIu7Dd@cluster0.gudaofb.mongodb.net/MiraiTech_db?retryWrites=true&w=majority";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));
 
app.use('/', router())