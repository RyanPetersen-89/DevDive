const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../../controllers/userController');

// Route to serve the registration form
router.get('/register', (req, res) => {
  res.render('partials/register', {
    layout: 'main'
  });
});

// Route to serve the login form
router.get('/login', (req, res) => {
  res.render('partials/login', {
    layout: 'main'
  });
});

// API route to handle user registration
router.post('/register', register);

// API route to handle user login
router.post('/login', login);

// API route to handle user logout
router.post('/logout', logout);

module.exports = router;
