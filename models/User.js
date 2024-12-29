const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  publicKey: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;