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
   
    return (
        <div>
            {posts.map((post,i) => {
                return <Post key={i} post={post} />
            })} 
        </div>
    )
    
}

export default Feed;