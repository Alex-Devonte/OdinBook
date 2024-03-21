import axios from 'axios';
const GET_USERS_URL = '/api/users';

const getUsers = async () => {
    const response = await axios.get(GET_USERS_URL);
    console.log(response.data);
    return response.data;
}

const userService = { getUsers };
export default userService;