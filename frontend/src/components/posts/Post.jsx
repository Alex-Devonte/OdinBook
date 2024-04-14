import { useSelector, useDispatch } from 'react-redux';
import { createComment, deleteComment, deletePost, likePost } from '../../features/posts/postSlice';
import { useState } from 'react';
import { FaCommentAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { FaTrash } from "react-icons/fa";


function Post(props) {
    const {post} = props;
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [showComments, setShowComments] = useState(false);
    const userID = useSelector((state) => state.auth.user._id);

    const handleLikePost = () => {
        dispatch(likePost(post._id));
    };

    const handleCreateComment = () => {
        const commentData = {postID: post._id, commentText: comment};
        console.log(comment);
        dispatch(createComment(commentData));
        setComment('');
    }

    const displayComments = () => {
        setShowComments(!showComments);
    }

    const handleDeleteComment = (postID, commentID) => {
        dispatch(deleteComment({postID, commentID}));
    }

    const handleDeletePost = (postID) => {
        dispatch(deletePost(postID));
    }

    const listOfComments = post.comments.map(comment => (
        <div key={comment._id} className='flex flex-col'>
            <div className='flex items-center gap-3 p-1 mt-3'>
                <img src={comment.author.profilePicture} className='w-8 rounded-full'/>
                <p>{comment.author.firstName} {comment.author.lastName}</p>
            </div>
            <div className='flex justify-between p-1'>
                <p>{comment.text}</p>
                {(comment.author._id === userID || userID === post.author._id) && ( //Check if comment author is current user or if current user created the post
                    <FaTrash onClick={() => handleDeleteComment(post._id, comment._id)} className='cursor-pointer transition duration-75 ease-linear hover:fill-red-600'/>
                )}
            </div>
        </div>
    ));

    const formatDate = (date)  => {
        const createdDate = new Date(date);
        const currentDate = new Date();

        //Calculate the difference in milliseconds
        const differenceInMs = currentDate - createdDate;

        //Calculate difference in seconds, minutes, hours, and days
        const seconds = Math.floor(differenceInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        let formattedResult;
        if (days >= 1) {
            formattedResult = days === 1 ? '1 day ago' : `${days} days ago`;
        } else if (hours >= 1) {
            formattedResult = hours === 1 ? '1 hour ago' : `${hours} hours ago`;
        } else if (minutes >= 1) {
            formattedResult = minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
        } else {
            formattedResult = seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
        }
        return formattedResult;
    }

    return (
        <div className='container bg-slate-300 border rounded-lg m-5 p-1 mx-auto'>
            <div className='flex items-center gap-2 p-1'>
                <img src={post.author.profilePicture} className="w-10 rounded-full"/>
                <p>{post.author.firstName + ' ' + post.author.lastName}</p>
                <p>{formatDate(post.createdDate)}</p>
                {post.author._id === userID && (
                <FaTrash onClick={() => handleDeletePost(post._id)} className='ml-auto cursor-pointer transition duration-75 ease-linear hover:fill-red-600'/>
            )}
            </div>
            <div className='p-1 my-2'>
                <p>{post.content}</p>
            </div>
            <div className='flex gap-1 px-1'>
                <div onClick={displayComments} className='flex items-center gap-1 p-1 cursor-pointer'>
                    <FaCommentAlt />
                    <p className='p-1'>{post.comments.length}</p>
                </div>
                <div onClick={handleLikePost} className='flex items-center gap-1 p-1 cursor-pointer'>
                    {/* Color heart icon if user liked the post */}
                    {post.likes.find(id => id === userID) ? <FaHeart className='fill-red-500' /> : <FaHeart />}
                    <p className='p-1'>{post.likes.length}</p>
                </div>
            </div>
            {showComments && (
                <div className='flex flex-col justify-start'>
                    <div className='border-t'>{listOfComments}</div>
                    <div className='flex items-center gap-4 border-t p-1'>
                        <textarea
                            name='commentText'
                            value={comment}
                            rows='2'
                            placeholder={`Add a comment for ${post.author.firstName}'s post`}
                            onChange={(e) => setComment(e.target.value)}
                            className='resize-none flex-1 rounded-md my-3 p-1'
                            >
                        </textarea>
                        <IoMdSend onClick={handleCreateComment} className='fill-black text-white w-10 h-10 cursor-pointer transition duration-75 ease-linear hover:fill-odin-gold' />
                    </div>
                </div>
            )} 
        </div>
    );
}

export default Post;