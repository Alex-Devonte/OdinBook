import axios from 'axios';
const CREATE_POST_URL = '/api/posts/create';
const GET_POSTS_URL = '/api/posts/';
const LIKE_POST_URL = '/api/posts/likePost';

//Checks for valid JWT
const checkAuth = (token) => {
    return axios.create({
        //Send authorization header since its a protected route
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const createPost = async (postContent, token) => {
    const response = await checkAuth(token).post(CREATE_POST_URL, postContent);
    console.log(response.data);
    return response.data;
}

const getPosts = async (token) => {
    const response = await checkAuth(token).get(GET_POSTS_URL);
    return response.data;
}

const likePost = async(token, postID) => {
    const response = await checkAuth(token).post(LIKE_POST_URL, {postID: postID});
    return response.data;
}

const postService = { createPost, getPosts, likePost };
export default postService;