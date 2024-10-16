import axios from 'axios';
const CREATE_POST_URL = `${import.meta.env.VITE_API_URL}/api/posts/create`;
const GET_POSTS_URL = `${import.meta.env.VITE_API_URL}/api/posts/`;
const LIKE_POST_URL = `${import.meta.env.VITE_API_URL}/api/posts/likePost`;
const DELETE_POST_URL = `${import.meta.env.VITE_API_URL}/api/posts/delete`;
const CREATE_COMMENT_URL = `${
  import.meta.env.VITE_API_URL
}/api/posts/comments/create`;
const DELETE_COMMENT_URL = `${
  import.meta.env.VITE_API_URL
}/api/posts/comments/delete`;

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
    return response.data;
}

const getPosts = async (token) => {
    const response = await checkAuth(token).get(GET_POSTS_URL);
    return response.data;
}

const deletePost = async (token, postID) => {
    const response = await checkAuth(token).delete(DELETE_POST_URL, { data: { postID } });
    return response.data;
}

const likePost = async(token, postID) => {
    const response = await checkAuth(token).post(LIKE_POST_URL, {postID: postID});
    return response.data;
}

const createComment = async(token, postID, commentText) => {
    const response = await checkAuth(token).post(CREATE_COMMENT_URL, {postID, commentText});
    return response.data;
}

const deleteComment = async(token, postID, commentID) => {
    const response = await checkAuth(token).delete(DELETE_COMMENT_URL, { data: {postID, commentID} });
    return response.data;
}

const postService = { createPost, getPosts, deletePost, likePost, createComment, deleteComment };
export default postService;