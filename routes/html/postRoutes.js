const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');

// Display all posts
router.get('/', postController.getAllPosts);

// Display form to create a new post
router.get('/new', postController.newPostForm);

// Submit a new post
router.post('/', postController.createPost);

// Display form to edit a post
router.get('/edit/:id', postController.editPostForm);

// Update a post
router.post('/edit/:id', postController.updatePost);

// Delete a post
router.get('/delete/:id', postController.deletePost);

module.exports = router;