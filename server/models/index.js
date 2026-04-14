const sequelize = require('../config/db');
const User = require('./User');
const Category = require('./Category');
const Transaction = require('./Transaction');
const Budget = require('./Budget');

// User <-> Category
User.hasMany(Category, { foreignKey: 'userId', as: 'categories' });
Category.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User <-> Transaction
User.hasMany(Transaction, { foreignKey: 'userId', as: 'transactions' });
Transaction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Category <-> Transaction
Category.hasMany(Transaction, { foreignKey: 'categoryId', as: 'transactions' });
Transaction.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// User <-> Budget
User.hasMany(Budget, { foreignKey: 'userId', as: 'budgets' });
Budget.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Category <-> Budget
Category.hasMany(Budget, { foreignKey: 'categoryId', as: 'budgets' });
Budget.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Seed default categories
const seedCategories = async () => {
  const count = await Category.count({ where: { userId: null } });
  if (count === 0) {
    const defaults = [
      // Expense categories
      { name: 'Food & Dining', type: 'expense', icon: '🍔' },
      { name: 'Transportation', type: 'expense', icon: '🚗' },
      { name: 'Shopping', type: 'expense', icon: '🛍️' },
      { name: 'Entertainment', type: 'expense', icon: '🎬' },
      { name: 'Bills & Utilities', type: 'expense', icon: '💡' },
      { name: 'Healthcare', type: 'expense', icon: '🏥' },
      { name: 'Education', type: 'expense', icon: '📚' },
      { name: 'Rent', type: 'expense', icon: '🏠' },
      { name: 'Travel', type: 'expense', icon: '✈️' },
      { name: 'Other Expense', type: 'expense', icon: '📦' },
      // Income categories
      { name: 'Salary', type: 'income', icon: '💰' },
      { name: 'Freelance', type: 'income', icon: '💻' },
      { name: 'Investments', type: 'income', icon: '📈' },
      { name: 'Gifts', type: 'income', icon: '🎁' },
      { name: 'Other Income', type: 'income', icon: '💵' },
    ];
    await Category.bulkCreate(defaults);
    console.log('✅ Default categories seeded');
  }
};

module.exports = {
  sequelize,
  User,
  Category,
  Transaction,
  Budget,
  seedCategories,
};
