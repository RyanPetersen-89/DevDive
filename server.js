const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const sequelize = require('./config/sequelize')

// This will load my enviroment variables from my .env file
dotenv.config();

// This will create an instance of the Express application
const app = express();

// Middleware to parse incoming request with JSON and URL-Endoded Payloads
app.use(express.json());

app.use(express.urlencoded({extended:true}));

// This will configure sessions using express session which makes it easier to handle secure user sessions
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saceUninitialized: false,
}));

// Handles files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// These define my routes for HTML views and API endpoints
app.use('/', require('./routes/html/index'));
app.use('/api', require('./routes/api/index'));

// This defines the port to listen on, based on the port that I specified in my .env file
const PORT = process.env.PORT||3001;

// This will sequelize models with the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});