const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const User = require('../models/user');

const getPosts = async (userID) => {
    //Get list of people the user follows
    const { following } = await User.findById(userID).select('following').exec();
    const posts = [];

    //Get posts from user
    const userPosts = await Post.find({ author: userID})
        .populate([
            {
                path: 'author',
                select: '_id firstName lastName profilePicture' //Send id as well
            },
            {
                path: 'comments.author',
                select: '-bio -email -password -followers -following'
            }
        ]).exec();

    posts.push(...userPosts);

    //Get posts people the user follows
    const followingPost = await Promise.all(following.map(async (id) => {
        const post = await Post.find({author: id.user})
            .populate([
                {
                    path: 'author',
                    select: '_id firstName lastName profilePicture' //Send id as well
                },
                {
                    path: 'comments.author',
                    select: '-bio -email -password -followers -following'
                }
            ]).exec();

        return post;
    }));

    //Use spread operator to flatten array since Promise all was creating array of arrays
    posts.push(...followingPost.flat());

    //Sort posts newest to oldest by creation date
    posts.sort((a, b) => b.createdDate - a.createdDate);
    return posts;
};

exports.get_posts = asyncHandler(async (req, res, next) => {
    //Get user id from response
    const userID = req.user._id;
    const posts = await getPosts(userID);
    res.json(posts);
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

exports.delete_post = asyncHandler(async (req, res, next) => {
    const { postID } = req.body;
    const userID = req.user._id;

    //Delete the specified post
    const deletedPost = await Post.findOneAndDelete({_id: postID}).exec();

    //Get the updated collection of posts
    const updatedPosts = await getPosts(userID);
    return res.json(updatedPosts)
});

exports.like_post = asyncHandler(async (req, res, next) => {
    //Get id of user who liked post
    const userID = req.user._id;

    //Get post id from response
    const {postID} = req.body;

    const post = await Post.findById(postID).exec();

    //'Like' or 'unlike' post based on if user is in the likes array
    const updateLike = post.likes.includes(userID) ? { $pull: { likes: userID } } : { $push: { likes: userID } };

    const result = await Post.findByIdAndUpdate(postID, updateLike, { new: true })
        .populate([
            {
                path: 'author',
                select: '-_id firstName lastName profilePicture'
            },
            {
                path: 'comments.author',
                select: '-bio -email -password -followers -following'
            }
        ]).exec();
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
                .populate({path: 'comments.author', select: '-bio -email -password -followers -following'}).exec();

            return res.status(200).json(comment);
        })
];

exports.delete_comment = asyncHandler(async (req, res, next) => {
    const {postID, commentID} = req.body;
    //Find post and remove specified comment from array
    const result = await Post.findByIdAndUpdate(postID,
        { 
            $pull: { comments: { _id: commentID} }
        }, 
        {
            new: true
        })
        .populate({path: 'comments.author', select: '-bio -email -password -followers -following'}).exec();
        
    return res.send(result);
});