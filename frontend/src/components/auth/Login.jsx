import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Spinner';

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
        return <Spinner />
    }

    return (
        <section className='flex h-screen'>
            <div className='bg-cover bg-center hidden md:block md:basis-2/5 lg:basis-4/12  bg-slate-500 bg-[url("/images/odinbg-colored.png")]'></div>
            <div className='flex flex-col justify-center grow text-center'>
                <h1 className='text-6xl mb-5'>OdinBook</h1>
                <h3 className='text-xl  text-gray-500 mb-5'>Login to your account below</h3>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 w-5/6 md:w-3/4 lg:w-5/12 mx-auto'>
                    {message && (
                        <div
                            className='bg-red-100 text-red-600 rounded-md text-left font-semibold p-2 my-3 col-span-full'>
                            {message}
                        </div>
                    )}
                    <div className="col-span-full">
                        <input
                            type='text'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            className='bg-gray-200 rounded-md p-2 w-full'
                        />
                    </div>
                    <div className="col-span-full">
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            className='border-gray-500 bg-gray-200 rounded-md p-2 w-full'
                        />
                    </div>
                    <button
                        type='submit'
                        className='bg-black text-white font-bold rounded-md p-2 col-span-full mt-5 transition duration-100 ease-linear hover:bg-odin-gold active:bg-odin-gold'
                    >
                        Log In
                    </button>
                    <Link to='/register' className='justify-start text-left mt-5 col-span-full'>Don&#39;t have an account?
                        <span className='text-odin-gold font-bold hover:underline transition duration-100 ease-linear hover:text-black'> Sign up here</span>
                    </Link>
                </form>
            </div>
        </section>
    )   
}

export default Login;