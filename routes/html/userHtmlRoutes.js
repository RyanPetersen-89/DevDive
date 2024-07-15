const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/authMiddleware');
const { Post } = require('../../models');

// Route to serve the registration page
router.get('/register', (req, res) => {
  res.render('partials/register', { layout: 'main', loggedIn: req.session.loggedIn });
});

// Route to serve the login page
router.get('/login', (req, res) => {
  res.render('partials/login', { layout: 'main', loggedIn: req.session.loggedIn });
});

// Route to serve the dashboard
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.session.userId },
      order: [['createdAt', 'DESC']]
    });
    res.render('dashboard', { layout: 'main', username: req.session.username, posts, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    res.status(500).send('Error fetching user posts.');
  }
});

// Route to serve the form to create a new post
router.get('/posts/new', isAuthenticated, (req, res) => {
  res.render('partials/newPost', { layout: 'main', username: req.session.username, loggedIn: req.session.loggedIn });
});

// Route to serve the form to edit a post
router.get('/posts/:id/edit', isAuthenticated, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    if (post.userId !== req.session.userId) {
      return res.status(403).send('Unauthorized');
    }
    res.render('partials/editPost', { layout: 'main', post, loggedIn: req.session.loggedIn });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).send('Error fetching post.');
  }
});

// Root route
router.get('/', (req, res) => {
  res.render('home', { layout: 'main', loggedIn: req.session.loggedIn });
});

module.exports = router;
