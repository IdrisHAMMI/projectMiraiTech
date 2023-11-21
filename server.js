const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express(); //EXPRESS INSTANCE

// BODY PARSER MIDDLEWARE TO PARSE JSON REQUESTS
app.use(express.json());

// CORS ("CROSS ORIGIN RESOURCE SHARING") ENABLER
app.use(cors());

//CONTROLERS
var usersController = require('./controllers/userController.js');

// TESTING SPACE
app.use('/users', usersController);

// DB CONNECTION STRING
const CONNECTION_STRING = "mongodb+srv://hammiidris:j2c1ivpAj5JIu7Dd@cluster0.gudaofb.mongodb.net/MiraiTech_db?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const db = mongoose.connection;

const port = 3000;

// NULL ENDPOINT ERROR
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// SERVER START
app.listen(port, () => {
  console.log(`Server is running on port ${port}. URL: http://localhost:${port}`);
});
