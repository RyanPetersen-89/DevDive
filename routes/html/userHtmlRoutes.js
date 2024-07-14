const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');

// Route to serve the registration page
router.get('/register', (req, res) => {
  res.render('partials/register', { layout: 'main' });
});

// Route to serve the login page
router.get('/login', (req, res) => {
  res.render('partials/login', { layout: 'main' });
});

// Route to serve the dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
  res.render('dashboard', { layout: 'main', username: req.session.username });
});

// Route to serve the form to create a new post
router.get('/posts/new', isAuthenticated, (req, res) => {
  res.render('partials/newPost', { layout: 'main', username: req.session.username });
});

// Root route
router.get('/', (req, res) => {
  res.render('home', { layout: 'main' });
});

module.exports = router;