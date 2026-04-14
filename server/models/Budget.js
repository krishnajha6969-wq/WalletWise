const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Budget = sequelize.define('Budget', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
    validate: {
      min: { args: [0.01], msg: 'Budget amount must be greater than 0' },
    },
  },
  spent: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12,
    },
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'categoryId', 'month', 'year'],
    },
  ],
});

module.exports = Budget;
