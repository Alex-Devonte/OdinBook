const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {checkAuth} = require('../authMiddleware');

router.get('/', checkAuth, userController.get_users);
router.post('/followUser', checkAuth, userController.follow_user);
router.post('/respondToRequest', checkAuth, userController.respond_to_follow_request);


module.exports = router;