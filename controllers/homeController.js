const { User, Post } = require('../models');

const index = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: User // Include User model to show post authors
    });

    res.render('home', { posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

module.exports = {
  index
};