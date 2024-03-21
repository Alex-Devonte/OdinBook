const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

exports.get_posts =  asyncHandler(async (req, res, next) => {
    //Get posts as well as their author
    const posts = await Post.find({}).limit(3).populate({path: 'author', select: '-email -password -bio'}).exec();
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