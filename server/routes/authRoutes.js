const router = require('express').Router();
const validate = require('../middleware/validation');
const authController = require('../controllers/authController');

router.post('/register', validate('register'), authController.register);
router.post('/login', validate('login'), authController.login);

module.exports = router;
