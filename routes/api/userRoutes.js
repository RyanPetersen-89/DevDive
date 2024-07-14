const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../../controllers/userController');

// Route to serve the registration form
router.get('/register', (req, res) => {
  // Assuming you have a layout that includes a partial for forms
  res.render('partials/register', {
    layout: 'main' // Specify your layout file if needed
  });
});

// This is a Route to serve the login form
router.get('/login', (req, res) => {
  res.render('partials/login', {
    layout: 'main' // Specify your layout file if needed
  });
});

// This is an API route to handle user registration
router.post('/api/users/register', register);

// This is an API route to handle user login
router.post('/api/users/login', login);

// This is an API route to handle user logout
router.post('/api/users/logout', logout);

module.exports = router;