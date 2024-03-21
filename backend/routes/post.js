const express = require('express');
const router = express.Router();
const {checkAuth} = require('../authMiddleware');
const postController = require('../controllers/postController');

router.get('/', checkAuth, postController.get_posts);

router.post('/create', checkAuth, postController.create_post);

module.exports = router;