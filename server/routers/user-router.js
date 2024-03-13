const Router = require('express').Router;
const router = new Router();
const { body } = require('express-validator');
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const roleMiddleware = require('../middlewares/role-middleware');

router.post('/registration',
   body('email').isEmail().withMessage('Invalid email format'),
   body('password').isLength({ min: 3, max: 32 }).withMessage('Password must be between 3 and 32 characters'),
   body('name').isLength({ min: 2, max: 32 }).withMessage('Name must be between 2 and 32 characters'),
   body('surname').isLength({ min: 2, max: 32 }).withMessage('Surname must be between 2 and 32 characters'),
   userController.registration
);
router.post('/login',
   body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email cannot be empty'),
   body('password').isLength({ min: 3, max: 32 }).withMessage('Password must be between 3 and 32 characters'),
   userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', roleMiddleware(['DeliveryMan']), userController.getUsers)
// router.get('/users', authMiddleware, userController.getUsers)

module.exports = router;