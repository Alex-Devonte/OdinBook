const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

exports.get_users = asyncHandler(async (req, res, next) => {
    const userID = req.user._id;
    const userFollowers = await User.findById(userID).select('followers').exec();
    const followersArr = userFollowers.followers.map(follower => follower.user);

    //Get users that aren't in followers array(haven't sent request yet)
    const discoverUsers = await User.find({
        $and: [
            { _id: { $ne: userID } },
            { _id: { $nin : followersArr} }
        ]
    }).select('firstName lastName profilePicture followers').limit(10).exec();

    return res.json(discoverUsers);
});

exports.update_bio = [
    body('updatedBio')
        .trim()
        .escape(),

    asyncHandler(async (req, res, next) => {
        const userID = req.user._id;
        const {updatedBio} = req.body;

        const updateUserBio = await User.findByIdAndUpdate(userID, { bio: updatedBio }, {new: true }).exec();
        return res.json(updateUserBio);
    })
];

exports.upload_profile_picture = asyncHandler(async (req, res, next) => {
    const userID = req.user._id;
    const imagePath = `${process.env.UPLOAD_URL}/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(userID, { profilePicture: imagePath }, { new: true }).exec();
    return res.json(updatedUser);
});


exports.send_follow_request = asyncHandler(async (req, res, next) => {
    //IDs of currently logged in user and user that is being sent a follow request
    const currentUserID = req.user._id;
    const {requestedUserID} = req.body;

    const currentUser = await User.findById(currentUserID);
    const requestedUser = await User.findById(requestedUserID);

    //Add currentUser to requested user's follower list if they aren't already there
    if (!requestedUser.followers.some(follower => follower.user.equals(currentUser._id))) {
        requestedUser.followers.push({user: currentUser});

        await requestedUser.save();
        await User.findById(requestedUserID).populate('followers.user', '_id firstName lastName profilePicture');

        const response = await User.findById(currentUserID);
        return res.json(response);
    } else {
        return res.json('You already follow this user.');
    }
});

exports.respond_to_follow_request = asyncHandler(async (req, res, next) => {
    const {userResponse, followerID} = req.body;
    const respondingUserID = req.user._id;

    if (userResponse === 'accepted') {
        //After user accepts request, add them to the follower's(request sender) following array
        await User.findByIdAndUpdate(
            followerID,
            { $push: { following: { user: respondingUserID } } },
            { new: true } 
        ).populate('following.user').exec();

        //Add responding user to request senders followers array to complete the `follow back` after accepting request
        await User.findByIdAndUpdate(
            followerID,
            { $push: { followers: { user: respondingUserID, status: 'accepted' }}},
            { new: true }
        ).populate('followers.user').populate('following.user').exec();

        //Update the status of the follower(request sender) in the responding user's followers array
        await User.findOneAndUpdate(
            { _id: respondingUserID, 'followers.user': followerID },
            { $set: { 'followers.$.status': userResponse } },
            { new: true }
        ).populate('followers.user').populate('following.user').exec();

        //Have the responding user `follow back` the request sender by adding the request sender to the following array
        const followBackQuery = await User.findByIdAndUpdate(
            respondingUserID,
            { $addToSet: { following: { user: followerID } } },
            { new: true }
        ).populate('followers.user').populate('following.user').exec();

        res.json(followBackQuery);

    } else if (userResponse === 'denied') {
        //Remove user from followers(request sender) array if request is denied
        const response = await User.findOneAndUpdate(
            { _id: respondingUserID },
            { $pull: { followers: { user: followerID } } },
            { new: true }
        ).populate('followers.user').populate('following.user').exec();

        res.json(response);
    }
});