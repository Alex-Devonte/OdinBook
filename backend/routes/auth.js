const express = require('express');
const router = express.Router();
const {checkAuth} = require('../authMiddleware');

const authController = require('../controllers/authController');

router.post('/signup', authController.register_user);
router.post('/login', authController.login_user);

module.exports = router;