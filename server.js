const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/sequelize');
const path = require('path');
const exphbs = require('express-handlebars');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create an instance of the Express application
const app = express();

// Set Handlebars as the view engine and configure partials directory
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);
app.use(express.static(publicPath));

// Log contents of the public directory
fs.readdir(publicPath, (err, files) => {
    if (err) {
        console.error('Error reading public directory:', err);
    } else {
        console.log('Files in public directory:', files);
        files.forEach(file => {
            console.log(`- ${file}`);
        });
    }
});

// Log each static file request
app.use((req, res, next) => {
    console.log('Request URL:', req.url);
    next();
});

// Test route to serve the CSS file directly
app.get('/test-css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/css/style.css'));
});

// Configure sessions using express-session
app.use(session({
  secret: process.env.SESSION_SECRET, // Use a secret from environment variables
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // Interval at which expired sessions will be cleared
    expiration: 24 * 60 * 60 * 1000  // Maximum age of a valid session
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production if using HTTPS
    httpOnly: true, // Prevents client-side JS from accessing the cookie
    maxAge: 24 * 60 * 60 * 1000 // Cookie expires in 24 hours
  }
}));

// Import routes
const userRoutes = require('./routes/api/userRoutes');
const postRoutes = require('./routes/api/postRoutes');
const userHtmlRoutes = require('./routes/html/userHtmlRoutes');

// Setup routes
app.use('/api/users', userRoutes); // User-related API routes
app.use('/api/posts', postRoutes); // Post-related API routes
app.use('/', userHtmlRoutes); // User-specific HTML routes (e.g., login, register)

// Catch all for unhandled routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke! Please contact support if the problem persists.');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle database connection errors
sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
