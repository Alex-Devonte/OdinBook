import axios from 'axios';
const GET_USERS_URL = '/api/users';
const FOLLOW_REQUEST_URL = '/api/users/followUser';

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
    console.log(response.data);
    return response.data;
}

const sendFollowRequest = async (token, currentUserID, requestUserID) => {
    const response = await checkAuth(token).post(FOLLOW_REQUEST_URL, {currentUserID: currentUserID, requestUserID: requestUserID});
    console.log(response.data);
    return response.data;
}

const userService = { getUsers, sendFollowRequest };
export default userService;