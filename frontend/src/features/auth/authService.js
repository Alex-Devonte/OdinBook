import axios from 'axios';
const REGISTER_URL = `${import.meta.env.VITE_API_URL}/api/auth/register`;
const LOGIN_URL = `${import.meta.env.VITE_API_URL}/api/auth/login`;

const register = async (userData) => {
    const response = await axios.post(REGISTER_URL, userData);
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const login = async (userData) => {
    const response = await axios.post(LOGIN_URL, userData);
    
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
}

const logout = () => {
    localStorage.removeItem('user');
}

const authService = { register, login, logout };
export default authService;

