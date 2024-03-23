const asyncHandler = require('express-async-handler');
const User = require('../models/user');

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

exports.respond_to_follow_request = asyncHandler(async (req, res, next) => {
    const {userResponse, followerID, respondingUserID} = req.body;

    if (userResponse === 'accepted') {
        //Find the follower with the specified ID and update the status
        await User.findOneAndUpdate(
            { _id: respondingUserID, 'followers._id': followerID },
            { $set: { 'followers.$.status': userResponse } }
        ).exec();

        //After user accepts request, add them to the followers following array
        await User.findByIdAndUpdate(followerID).updateOne({$push: {following:  respondingUserID}}).exec();
    
        res.json('Accepted');

    } else if (userResponse === 'denied') {
        //Remove user from followers array if request is denied
        await User.findOneAndUpdate(
            { _id: respondingUserID },
            { $pull: { followers: { _id: (followerID) } } }
        ).exec();

        res.json('Denied request');
    }
});