const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//DB CONNECTION STRING ID
var CONNECTION_STRING="mongodb+srv://hammiidris:?8#A;~8RrQe-^JW@cluster0.gudaofb.mongodb.net/?retryWrites=true&w=majority"

const mongoose = require('mongoose');
const mongoDBURL = 'mongodb://localhost:27017/your-database-name';

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
const port = 3000;

//CORS ("CROSS ORIGIN RESOURCE SHARING") ENABLER
app.use(cors());
//END

//BODY PARSER MIDDLEWARE TO PARSE JSON REQUESTS
app.use(bodyParser.json());

//SERVER START
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
