const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');


const app = express(); //EXPRESS INSTANCE

// CORS ("CROSS ORIGIN RESOURCE SHARING") ENABLER

app.use(cookieParser())

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200', 'http://localhost:3000']
}));

//USER ROUTES
const routes = require('./controllers/userController.js');



// BODY PARSER MIDDLEWARE TO PARSE JSON REQUESTS
app.use(express.json());

app.use("/api", routes);

// DB CONNECTION STRING
const CONNECTION_STRING = "mongodb+srv://hammiidris:j2c1ivpAj5JIu7Dd@cluster0.gudaofb.mongodb.net/MiraiTech_db?retryWrites=true&w=majority";


mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const port = process.env.PORT || 3000;

// Null endpoint error
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Server start
app.listen(port, () => {
  console.log(`Server is running on port ${port}. URL: http://localhost:${port}`);
});

module.exports = app;
