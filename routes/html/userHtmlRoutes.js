const express = require('express');
const router = express.Router();
const homeController = require('../../controllers/homeController');

// Route to serve the registration page
router.get('/register', (req, res) => {
  res.render('partials/register', { layout: 'main' }); // Adjust 'main' if you use a different layout
});

// Route to serve the login page
router.get('/login', (req, res) => {
  res.render('partials/login', { layout: 'main' });
});

// Serve the homepage
router.get('/', homeController.index);

module.exports = router;