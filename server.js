const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/sequelize');
const path = require('path');

// This loads environment variables from .env file
dotenv.config();

// This create an instance of the Express application
const app = express();

// The middleware to parse incoming JSON and URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This configures sessions using express-session
app.use(session({
  secret: process.env.SESSION_SECRET, // This uses a secret from environment variables
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // Sets the interval at which expired sessions will be cleared
    expiration: 24 * 60 * 60 * 1000  // This sets the max time of a valid session
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// This serves static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// This defines routes for HTML views and API endpoints
app.use('/', require('./routes/html/index'));
app.use('/api', require('./routes/api/index'));

// This defines the port to listen on, based on the specified environment variable or default to 3001
const PORT = process.env.PORT || 3001;

// This syncs Sequelize models with the database and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});