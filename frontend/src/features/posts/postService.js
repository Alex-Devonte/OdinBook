import axios from 'axios';
const CREATE_POST_URL = '/api/posts/create';

const createPost = async (postContent, token) => {
    //Send authorization header since its a protected route
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(CREATE_POST_URL, postContent, config);
    console.log(response.data);
    return response.data;
}

const postService = { createPost };
export default postService;