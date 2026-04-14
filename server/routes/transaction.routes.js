const router = require('express').Router();
const transactionController = require('../controllers/transaction.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', transactionController.getAll);
router.post('/', transactionController.create);
router.put('/:id', transactionController.update);
router.delete('/:id', transactionController.remove);

module.exports = router;
