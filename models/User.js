const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  // This will define my columns for the User model
  username:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;