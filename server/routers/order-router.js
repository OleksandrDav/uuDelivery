const Router = require('express').Router;
const router = new Router();
const { body } = require('express-validator');
const orderController = require('../controllers/order-controller');

router.post('/',
   body('destination').trim().isLength({ min: 2, max: 100 }).withMessage('Destination must be between 2 and 100 characters'),
   body('customerEmail').trim().isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email cannot be empty'),
   orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOneOrder);
router.put('/', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);


module.exports = router;