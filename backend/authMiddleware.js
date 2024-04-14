const User = require('./models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const checkAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(' ')[1];

      //Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      next(new Error('Not authorized'));
    }
  }

  if(!token) {
    next(new Error('Not authorized, no token'));
  }
});

module.exports = {checkAuth};