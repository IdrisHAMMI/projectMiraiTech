const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const mongoose = require('mongoose')

const app = express(); //EXPRESS INSTANCE

// BODY PARSER MIDDLEWARE TO PARSE JSON REQUESTS
app.use(express.json());

app.use(cookieParser());



// CORS ("CROSS ORIGIN RESOURCE SHARING") ENABLER
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200'
}));

// DB CONNECTION STRING
const CONNECTION_STRING = "mongodb+srv://hammiidris:j2c1ivpAj5JIu7Dd@cluster0.gudaofb.mongodb.net/MiraiTech_db?retryWrites=true&w=majority";


//CONTROLERS
var userRoutes = require('./controllers/userController')

// TESTING SPACE
app.use("/api", userRoutes)

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

// NULL ENDPOINT ERROR
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// SERVER START
app.listen(port, () => {
  console.log(`Server is running on port ${port}. URL: http://localhost:${port}`);
});