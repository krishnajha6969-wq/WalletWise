const { Op, fn, col, literal } = require('sequelize');
const { Transaction, Category } = require('../models');

// GET /api/reports/monthly-summary
exports.getMonthlySummary = async (req, res) => {
  try {
    const { year } = req.query;
    const targetYear = year || new Date().getFullYear();

    const results = await Transaction.findAll({
      attributes: [
        [fn('EXTRACT', literal('MONTH FROM "date"')), 'month'],
        'type',
        [fn('SUM', col('amount')), 'total'],
      ],
      where: {
        userId: req.user.id,
        date: {
          [Op.between]: [`${targetYear}-01-01`, `${targetYear}-12-31`],
        },
      },
      group: [literal('EXTRACT(MONTH FROM "date")'), 'type'],
      order: [[literal('month'), 'ASC']],
      raw: true,
    });

    // Format into monthly data
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0,
    }));

    results.forEach((row) => {
      const monthIndex = parseInt(row.month) - 1;
      months[monthIndex][row.type] = parseFloat(row.total);
    });

    res.json({ year: parseInt(targetYear), data: months });
  } catch (error) {
    console.error('Monthly summary error:', error);
    res.status(500).json({ message: 'Failed to generate monthly summary' });
  }
};

// GET /api/reports/category-breakdown
exports.getCategoryBreakdown = async (req, res) => {
  try {
    const { month, year, type = 'expense' } = req.query;
    const where = { userId: req.user.id, type };

    if (month && year) {
      const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
      const endDate = new Date(year, month, 0).toISOString().split('T')[0];
      where.date = { [Op.between]: [startDate, endDate] };
    } else if (year) {
      where.date = { [Op.between]: [`${year}-01-01`, `${year}-12-31`] };
    }

    const results = await Transaction.findAll({
      attributes: [
        'categoryId',
        [fn('SUM', col('amount')), 'total'],
        [fn('COUNT', col('Transaction.id')), 'count'],
      ],
      where,
      include: [{ model: Category, as: 'category', attributes: ['name', 'icon'] }],
      group: ['categoryId', 'category.id', 'category.name', 'category.icon'],
      order: [[literal('total'), 'DESC']],
      raw: true,
      nest: true,
    });

    res.json({ breakdown: results });
  } catch (error) {
    console.error('Category breakdown error:', error);
    res.status(500).json({ message: 'Failed to generate category breakdown' });
  }
};

// GET /api/reports/trend
exports.getTrend = async (req, res) => {
  try {
    const { months = 6 } = req.query;
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - (parseInt(months) - 1), 1);

    const results = await Transaction.findAll({
      attributes: [
        [fn('EXTRACT', literal('YEAR FROM "date"')), 'year'],
        [fn('EXTRACT', literal('MONTH FROM "date"')), 'month'],
        'type',
        [fn('SUM', col('amount')), 'total'],
      ],
      where: {
        userId: req.user.id,
        date: { [Op.gte]: startDate.toISOString().split('T')[0] },
      },
      group: [literal('EXTRACT(YEAR FROM "date")'), literal('EXTRACT(MONTH FROM "date")'), 'type'],
      order: [[literal('year'), 'ASC'], [literal('month'), 'ASC']],
      raw: true,
    });

    res.json({ trend: results });
  } catch (error) {
    console.error('Trend error:', error);
    res.status(500).json({ message: 'Failed to generate trend data' });
  }
};
