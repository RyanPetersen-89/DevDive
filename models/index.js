const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

// Imports my models

const User = require('./User');
const Post = require('./Post');

// This defines my associations
User.hasMany(Post, {
  foreignKey: 'userId', // This will add a userId to Post model as foreign key
  onDelete: 'CASCADE', // If user is deleted, this will delete all user associated posts
});

Post.belongsTo(User, {
  foreignKey: 'userId', // This will add a userId to Post model as a foreign key
});

module.exports = {
  User,
  Post,
  sequelize,
};