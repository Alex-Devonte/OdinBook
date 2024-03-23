const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const socialController = require('../controllers/socialController');
const {checkAuth} = require('../authMiddleware');

router.get('/', checkAuth, userController.get_users);
router.post('/followUser', checkAuth, socialController.follow_user);
router.post('/respondToRequest', checkAuth, socialController.respond_to_follow_request);


module.exports = router;