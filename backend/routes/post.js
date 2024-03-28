const express = require('express');
const router = express.Router();
const {checkAuth} = require('../authMiddleware');
const postController = require('../controllers/postController');

router.get('/', checkAuth, postController.get_posts);

router.post('/create', checkAuth, postController.create_post);
router.post('/likePost', checkAuth, postController.like_post);

router.post('/comments/create', checkAuth, postController.comment_post);

module.exports = router;