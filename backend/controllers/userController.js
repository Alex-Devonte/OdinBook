const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.get_users = asyncHandler(async (req, res, next) => {
    const users = await User.find({}).select('firstName lastName profilePicture').limit(5).exec();
    return res.json(users);
});