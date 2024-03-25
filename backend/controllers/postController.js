const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

exports.get_posts =  asyncHandler(async (req, res, next) => {
    //Get user id from response
    const userID = req.user._id;

    //Get list of people the user follows
    const { following } = await User.findById(userID).select('following').exec();
    const posts = [];

    //Get posts from the people the user follows
    await Promise.all(following.map(async (id) => {
        const post = await Post.find({author: id})
            .select('-_id')
            .populate({
                path: 'author',
                select: '-_id firstName lastName profilePicture'
            }).exec();

        //Use spread operator to flatten array since Promise all was creating array of arrays
        posts.push(...post);
    }));

    return res.json(posts);
});

exports.create_post = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Post cannot be empty')
        .isLength({max: 100})
        .withMessage('Post cannot be more than 100 characters')
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors);
        }

        //Create new post and save to db
        const post = await Post.create({
            author: req.user.id,
            content: req.body.content
        }); 

        res.status(200).json(post);
    })
];