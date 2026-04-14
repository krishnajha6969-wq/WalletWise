const router = require('express').Router();
const budgetController = require('../controllers/budget.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', budgetController.getAll);
router.post('/', budgetController.create);
router.put('/:id', budgetController.update);
router.delete('/:id', budgetController.remove);

module.exports = router;
