import { useDispatch } from 'react-redux';
import { createComment, likePost } from '../../features/posts/postSlice';
import { useState } from 'react';

function Post(props) {
    const {post} = props;
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');

    const handleLikePost = () => {
        dispatch(likePost(post._id));
    };

    const handleCreateComment = () => {
        const commentData = {postID: post._id, commentText: comment};
        console.log(comment);
        dispatch(createComment(commentData));
        setComment('');
    }

   // console.log(post);

    return (
        <div className='container'>
            <div className='border-2 border-b-black'>
                <img src={post.author.profilePicture} className="w-10 rounded-full"/>
                <p>Author: {post.author.firstName + ' ' + post.author.lastName}</p>
                <p>Content: {post.content}</p>
                <p>Comments: {post.comments.length}</p>
                <p>Likes: {post.likes.length}</p>
                <button onClick={handleLikePost}>Click here to like</button>
                <textarea
                    name='commentText' 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)}
                    className="border-2 border-black border-solid m-5"
                >
                </textarea>
                <button onClick={handleCreateComment}>Click here add comment</button>
            </div>
        </div>
    );
}

export default Post;