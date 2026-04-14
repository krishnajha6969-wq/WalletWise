const router = require('express').Router();
const reportController = require('../controllers/report.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/monthly-summary', reportController.getMonthlySummary);
router.get('/category-breakdown', reportController.getCategoryBreakdown);
router.get('/trend', reportController.getTrend);

module.exports = router;
