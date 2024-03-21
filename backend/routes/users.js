const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {checkAuth} = require('../authMiddleware');

router.get('/', checkAuth, userController.get_users);


module.exports = router;