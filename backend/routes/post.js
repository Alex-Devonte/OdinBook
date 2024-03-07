const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json('Post index');
});

router.get('/:postid', function(req, res, next) {
    res.json('Post Detail');
});

router.post('/:userid/create', function(req, res, next) {
    res.json('Create Post');
});

router.delete('/:userid/delete', function(req, res, next) {
    res.json('Delete Post');
});


module.exports = router;