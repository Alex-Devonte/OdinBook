import axios from 'axios';
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
const sendFollowRequest = async (token, requestUserID) => {
    const response = await checkAuth(token).post(FOLLOW_REQUEST_URL, {requestUserID: requestUserID});
    // console.log(response.data);
    return response.data;
}

const respondToFollowRequest = async (token, userResponse, followerID) => {
    const response = await checkAuth(token).post(RESPOND_TO_REQUEST_URL, {userResponse, followerID});
    console.log(response.data);
    return response.data;
}

const socialService = { sendFollowRequest, respondToFollowRequest };
export default socialService;