import { useDispatch } from 'react-redux';
import { likePost } from '../../features/posts/postSlice';

function Post(props) {
    const {post} = props;
    const dispatch = useDispatch();

    const handleLikePost = () => {
        dispatch(likePost(post._id));
    };

    console.log(post);

    return (
        <div className='container'>
            <div className='border-2 border-b-black'>
                <img src={post.author.profilePicture} className="w-10 rounded-full"/>
                <p>Author: {post.author.firstName + ' ' + post.author.lastName}</p>
                <p>Content: {post.content}</p>
                <p>Comments: {post.comments.length}</p>
                <p>Likes: {post.likes.length}</p>
                <button onClick={handleLikePost}>Click here to like</button>
            </div>
        </div>
    );
}

export default Post;