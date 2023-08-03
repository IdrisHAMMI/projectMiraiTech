const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const users = require('./routes/users');

// DB CONNECTION STRING
const CONNECTION_STRING = "mongodb+srv://hammiidris:j2c1ivpAj5JIu7Dd@cluster0.gudaofb.mongodb.net/?retryWrites=true&w=majority";

const app = express();

// BODY PARSER MIDDLEWARE TO PARSE JSON REQUESTS
app.use(express.json());

//CONTROLERS
var usersController = require('./controllers/userController.js');

//////////////////////
//TESTING SPACE

app.use('/users' , usersController);

//TESTING SPACE
///////////////////////

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const port = 3000;

//NULL ENDPOINT ERROR
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// CORS ("CROSS ORIGIN RESOURCE SHARING") ENABLER
app.use(cors());

// SERVER START
app.listen(port, () => {
  console.log(`Server is running on port ${port}. URL: http://localhost:${port}`);
});
