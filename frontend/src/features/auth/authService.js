import axios from 'axios';
const REGISTER_URL = '/api/auth/register'

const register = async (userData) => {
    const response = await axios.post(REGISTER_URL, userData);
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const logout = () => {
    localStorage.removeItem('user');
}

const authService = { register, logout };
export default authService;

