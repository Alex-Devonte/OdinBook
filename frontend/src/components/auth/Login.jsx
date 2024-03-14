import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [formData, setFormData] = useState({email: '', password: ''});

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Select specific state needed for component
    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        //Navigate to home if user logs in successfully or is already logged in
        if (isSuccess || user) {
            navigate('/');
        }
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {email: formData.email, password: formData.password};
        dispatch(login(userData));
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <section>
            <h1 className='text-7xl mb-10'>Log In</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 w-3/5 mx-auto'>
            <div 
                className='text-red-300 text-left'>
                {message}
            </div>
                <div className="col-span-full">
                    <input
                        type='text'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        className='border-2 border-black p-0.5 w-full'
                    />
                </div>

                <div className="col-span-full">
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        className='border-2 border-black p-0.5 w-full'
                    />
                </div>

                <button 
                    type='submit'
                    className='border-2 border-black p-2 col-span-full'
                >
                    Log In
                </button>
                <Link to='/register' className='justify-start text-left mt-5'>Don&#39;t have an account? Sign up here</Link>
            </form>
        </section>
    )   
}

export default Login;