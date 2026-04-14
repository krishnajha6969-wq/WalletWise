const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize, seedCategories } = require('./models');
const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');
const budgetRoutes = require('./routes/budget.routes');
const reportRoutes = require('./routes/report.routes');
const { Category } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/reports', reportRoutes);

// Categories endpoint (public after auth)
const authMiddleware = require('./middleware/authMiddleware');
app.get('/api/categories', authMiddleware, async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { userId: null },
          { userId: req.user.id },
        ],
      },
      order: [['type', 'ASC'], ['name', 'ASC']],
    });
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connected');

    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');

    await seedCategories();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
