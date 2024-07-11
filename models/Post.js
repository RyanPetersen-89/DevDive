const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');

// This defines the Post model
const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content:{
    type: DataTypes.TEXT,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTERGER,
    allowNull: false
  }
});
// This will sync the Post model with the database
(async () => {
  await Post.sync(); // This will create a post table if it doesn't already exist
})();

module.exports = Post;