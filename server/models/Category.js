const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'),
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING(50),
    defaultValue: null,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // null for system defaults
  },
}, {
  timestamps: true,
});

module.exports = Category;
