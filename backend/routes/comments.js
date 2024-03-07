const express = require('express');
const router = express.Router();

router.post('/posts/:postid/create', function(req, res, next) {
    res.json('Create new comment');
});

router.delete('/:commentid/delete', function(req, res, next) {
    res.json('Delete comment');
});

module.exports = router;