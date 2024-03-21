const asyncHandler = require('express-async-handler');
const User = require('../models/user');

exports.get_users = asyncHandler(async (req, res, next) => {
    const users = await User.find({}).select('firstName lastName profilePicture').limit(5).exec();
    return res.json(users);
});

exports.follow_user = asyncHandler(async (req, res, next) => {
    //IDs of currently logged in user and user that is being sent a follow request
    const {currentUserID, requestUserID} = req.body;
    const currentUser = await User.findById(currentUserID);
    const requestUser = await User.findById(requestUserID);

    //Add currentUser to follower list if they aren't already there
    if (!requestUser.followers.some(follower => follower._id.toString() === currentUserID)) {
        requestUser.followers.push(currentUserID);
        const response = await requestUser.save();
        console.log(response);
        return res.json(response);
    } else {
        return res.json('You already follow this user.');
    }

});