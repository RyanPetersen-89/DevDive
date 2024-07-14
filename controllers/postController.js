const { Post } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = await Post.create({
      title,
      content,
      userId: req.session.userId
    });
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Error creating post.');
  }
};

exports.updatePost = async (req, res) => { /* Logic to update a post */ };
exports.deletePost = async (req, res) => { /* Logic to delete a post */ };
