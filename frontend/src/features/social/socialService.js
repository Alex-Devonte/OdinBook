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
const sendFollowRequest = async (token, currentUserID, requestUserID) => {
    const response = await checkAuth(token).post(FOLLOW_REQUEST_URL, {currentUserID: currentUserID, requestUserID: requestUserID});
    // console.log(response.data);
    return response.data;
}

const respondToFollowRequest = async (token, userResponse, followerID, respondingUserID) => {
    const response = await checkAuth(token).post(RESPOND_TO_REQUEST_URL, {userResponse, followerID, respondingUserID});
    console.log(response.data);
    return response.data;
}

const socialService = { sendFollowRequest, respondToFollowRequest };
export default socialService;