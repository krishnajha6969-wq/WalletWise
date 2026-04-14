const { Budget, Category } = require('../models');

// GET /api/budgets
exports.getAll = async (req, res) => {
  try {
    const { month, year } = req.query;
    const where = { userId: req.user.id };

    if (month) where.month = parseInt(month);
    if (year) where.year = parseInt(year);

    const budgets = await Budget.findAll({
      where,
      include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type', 'icon'] }],
      order: [['createdAt', 'DESC']],
    });

    res.json({ budgets });
  } catch (error) {
    console.error('Get budgets error:', error);
    res.status(500).json({ message: 'Failed to fetch budgets' });
  }
};

// POST /api/budgets
exports.create = async (req, res) => {
  try {
    const { amount, month, year, categoryId } = req.body;

    if (!amount || !month || !year || !categoryId) {
      return res.status(400).json({ message: 'Amount, month, year, and category are required' });
    }

    // Check for existing budget
    const existing = await Budget.findOne({
      where: { userId: req.user.id, categoryId, month, year },
    });

    if (existing) {
      return res.status(400).json({ message: 'Budget already exists for this category and month' });
    }

    const budget = await Budget.create({
      amount,
      month,
      year,
      categoryId,
      userId: req.user.id,
    });

    const fullBudget = await Budget.findByPk(budget.id, {
      include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type', 'icon'] }],
    });

    res.status(201).json({ message: 'Budget created', budget: fullBudget });
  } catch (error) {
    console.error('Create budget error:', error);
    res.status(500).json({ message: 'Failed to create budget' });
  }
};

// PUT /api/budgets/:id
exports.update = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    const { amount } = req.body;
    await budget.update({ amount });

    const updated = await Budget.findByPk(budget.id, {
      include: [{ model: Category, as: 'category', attributes: ['id', 'name', 'type', 'icon'] }],
    });

    res.json({ message: 'Budget updated', budget: updated });
  } catch (error) {
    console.error('Update budget error:', error);
    res.status(500).json({ message: 'Failed to update budget' });
  }
};

// DELETE /api/budgets/:id
exports.remove = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    await budget.destroy();
    res.json({ message: 'Budget deleted' });
  } catch (error) {
    console.error('Delete budget error:', error);
    res.status(500).json({ message: 'Failed to delete budget' });
  }
};
