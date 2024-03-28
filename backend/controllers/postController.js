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
        .isLength({max: 240})
        .withMessage('Post cannot be more than 240 characters')
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

exports.like_post = asyncHandler(async (req, res, next) => {
    //Get id of user who liked post
    const userID = req.user._id;

    //Get post id from response
    const {postID} = req.body;

    const post = await Post.findById(postID).exec();

    //'Like' or 'unlike' post based on if user is in the likes array
    const updateLike = post.likes.includes(userID) ? { $pull: { likes: userID } } : { $push: { likes: userID } };

    const result = await Post.findByIdAndUpdate(postID, updateLike, { new: true })
        .populate({
            path: 'author',
            select: '-_id firstName lastName profilePicture'
        }).exec();

    res.send(result);
});

exports.comment_post = [
    body('commentText')
        .trim()
        .notEmpty()
        .withMessage("Comments cannot be empty")
        .isLength({max: 120})
        .withMessage('Comments cannot exceed 120 characters')
        .escape(),

        asyncHandler(async (req, res, next) => {
            
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json(errors);
            }

            const userID = req.user._id;
            const {postID} = req.body;
            const {commentText} = req.body;
  
            //Find post by its ID and add comment along with its author
            const comment = await Post.findOneAndUpdate({_id: postID},
                { $push: 
                    {
                        comments:{ author: userID, text: commentText}
                    },
                },
                {
                    new: true
                })
                .populate({path: 'comments.author', select: '-bio -email -password'}).exec();

            return res.status(200).json(comment);
        })
];