const { Op } = require('sequelize');
const { Transaction, Category, Budget } = require('../models');

// GET /api/transactions
exports.getAll = async (req, res) => {
  try {
    const { type, categoryId, startDate, endDate, page = 1, limit = 20 } = req.query;

    const where = { userId: req.user.id };
    if (type) where.type = type;
    if (categoryId) where.categoryId = categoryId;
    if (startDate && endDate) {
      where.date = { [Op.between]: [startDate, endDate] };
    } else if (startDate) {
      where.date = { [Op.gte]: startDate };
    } else if (endDate) {
      where.date = { [Op.lte]: endDate };
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await Transaction.findAndCountAll({
      where,
      include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type', 'icon'] }],
      order: [['date', 'DESC'], ['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset,
    });

    res.json({
      transactions: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / parseInt(limit)),
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

// POST /api/transactions
exports.create = async (req, res) => {
  try {
    const { amount, type, description, date, categoryId } = req.body;

    if (!amount || !type || !date || !categoryId) {
      return res.status(400).json({ message: 'Amount, type, date, and category are required' });
    }

    const transaction = await Transaction.create({
      amount,
      type,
      description: description || '',
      date,
      categoryId,
      userId: req.user.id,
    });

    // Update budget spent if it's an expense
    if (type === 'expense') {
      const txDate = new Date(date);
      const budget = await Budget.findOne({
        where: {
          userId: req.user.id,
          categoryId,
          month: txDate.getMonth() + 1,
          year: txDate.getFullYear(),
        },
      });
      if (budget) {
        budget.spent = parseFloat(budget.spent) + parseFloat(amount);
        await budget.save();
      }
    }

    const fullTransaction = await Transaction.findByPk(transaction.id, {
      include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type', 'icon'] }],
    });

    res.status(201).json({ message: 'Transaction created', transaction: fullTransaction });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ message: 'Failed to create transaction' });
  }
};

// PUT /api/transactions/:id
exports.update = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    const oldAmount = parseFloat(transaction.amount);
    const oldType = transaction.type;
    const oldCategoryId = transaction.categoryId;
    const oldDate = new Date(transaction.date);

    const { amount, type, description, date, categoryId } = req.body;
    await transaction.update({ amount, type, description, date, categoryId });

    // Adjust old budget
    if (oldType === 'expense') {
      const oldBudget = await Budget.findOne({
        where: {
          userId: req.user.id,
          categoryId: oldCategoryId,
          month: oldDate.getMonth() + 1,
          year: oldDate.getFullYear(),
        },
      });
      if (oldBudget) {
        oldBudget.spent = Math.max(0, parseFloat(oldBudget.spent) - oldAmount);
        await oldBudget.save();
      }
    }

    // Adjust new budget
    if (type === 'expense') {
      const txDate = new Date(date);
      const newBudget = await Budget.findOne({
        where: {
          userId: req.user.id,
          categoryId,
          month: txDate.getMonth() + 1,
          year: txDate.getFullYear(),
        },
      });
      if (newBudget) {
        newBudget.spent = parseFloat(newBudget.spent) + parseFloat(amount);
        await newBudget.save();
      }
    }

    const updated = await Transaction.findByPk(transaction.id, {
      include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type', 'icon'] }],
    });

    res.json({ message: 'Transaction updated', transaction: updated });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ message: 'Failed to update transaction' });
  }
};

// DELETE /api/transactions/:id
exports.remove = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Adjust budget
    if (transaction.type === 'expense') {
      const txDate = new Date(transaction.date);
      const budget = await Budget.findOne({
        where: {
          userId: req.user.id,
          categoryId: transaction.categoryId,
          month: txDate.getMonth() + 1,
          year: txDate.getFullYear(),
        },
      });
      if (budget) {
        budget.spent = Math.max(0, parseFloat(budget.spent) - parseFloat(transaction.amount));
        await budget.save();
      }
    }

    await transaction.destroy();
    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ message: 'Failed to delete transaction' });
  }
};
