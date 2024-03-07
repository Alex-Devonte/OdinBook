const express = require('express');
const router = express.Router();

router.post('/signup', function(req, res, next) {
    res.json('signup');
});

router.post('/login', function(req, res, next) {
    res.json('login');
});

module.exports = router;