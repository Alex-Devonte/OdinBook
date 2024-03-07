const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json('User index');
});

router.get('/:userid/profile', function(req, res, next) {
    res.json('User profile');
});

router.put('/:userid/profile/edit', function(req, res, next) {
    res.json('Update User Profile');
});

module.exports = router;