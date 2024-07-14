const { Post } = require('../models');

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Ensure the user is logged in
    if (!req.session.userId) {
      return res.status(401).send('Unauthorized');
    }

    // Create the new post
    const newPost = await Post.create({
      title,
      content,
      userId: req.session.userId
    });

    // Redirect to the dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send('Error creating post.');
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (post.userId !== req.session.userId) {
      return res.status(403).send('Unauthorized');
    }

    await post.update({ title, content });
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).send('Error updating post.');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    if (post.userId !== req.session.userId) {
      return res.status(403).send('Unauthorized');
    }

    await post.destroy();
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).send('Error deleting post.');
  }
};
