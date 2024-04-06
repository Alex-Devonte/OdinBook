import axios from 'axios';
const GET_USERS_URL = '/api/users';
const FOLLOW_REQUEST_URL = '/api/users/followUser';
const RESPOND_TO_REQUEST_URL = '/api/users/respondToRequest';


const checkAuth = (token) => {
    return axios.create({
        //Send authorization header since its a protected route
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

const getUsers = async (token) => {
    const response = await checkAuth(token).get(GET_USERS_URL);
    return response.data;
}

const sendFollowRequest = async (token, requestedUserID) => {
    const response = await checkAuth(token).post(FOLLOW_REQUEST_URL, {requestedUserID: requestedUserID});
    return response.data;
}

const respondToFollowRequest = async (token, userResponse, followerID) => {
    const response = await checkAuth(token).post(RESPOND_TO_REQUEST_URL, {userResponse, followerID});
    console.log(response.data);
    return response.data;
}


const userService = { getUsers, sendFollowRequest, respondToFollowRequest };
export default userService;