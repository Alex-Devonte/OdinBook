import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Post from "./Post";
import { getPosts } from "../../features/posts/postSlice";

function Feed() {
    const dispatch = useDispatch();
    const {posts} = useSelector((state) => state.posts);
    
    useEffect(() => {
        dispatch(getPosts());
    },[dispatch]);

    if (posts.length === 0) {
        return <h1>No post to show yet!</h1>
    }
   
    return (
        <div>
            {posts.map((post,i) => {
                return <Post key={i} post={post} />
            })} 
        </div>
    )
    
}

export default Feed;