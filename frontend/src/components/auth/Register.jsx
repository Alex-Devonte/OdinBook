import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '', 
        email: '', 
        password: '', 
        confirmPassword: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Select specific state needed for component
    const {user, isLoading, isError, isSuccess, fieldErrors, message} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        //Navigate to home if user registers or is already logged in
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
        
        const userData = {
            firstName: formData.firstName,
            lastName: formData.lastName, 
            email: formData.email, 
            password: formData.password, 
            confirmPassword: formData.confirmPassword
        }

        dispatch(register(userData));  
    }

    if (isLoading) {
        return <p>Loading...</p>
    }
    
    return (
        <section className='flex h-screen'>
            <ToastContainer />
            <div className='bg-cover bg-center hidden md:block md:basis-2/5 lg:basis-4/12 bg-slate-500 bg-[url("/images/odinbg-colored.png")]'></div>
            <div className='flex flex-col justify-center grow text-center'>
                <h1 className='text-6xl mb-5'>OdinBook</h1>
                <h3 className='text-xl text-gray-500 mb-5'>Create an account below</h3>
                <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 w-5/6 md:w-3/4 lg:w-5/12 mx-auto'>
                    <div className='grid-cols-2'>
                        <input
                            type='text'
                            name='firstName'
                            placeholder='First name'
                            value={formData.firstName}
                            onChange={handleChange}
                            className='border-gray-500 bg-gray-200 rounded-md p-2 w-full'
                        />
                        {fieldErrors.firstName && (
                            <div className='bg-red-100 text-red-600 rounded-md text-left font-semibold p-2 my-3 col-span-full'>
                                <p>{fieldErrors.firstName}</p>
                            </div>
                        )}
                    </div>
                    <div className='grid-cols-2'>
                        <input
                            type='text'
                            name='lastName'
                            placeholder='Last name'
                            value={formData.lastName}
                            onChange={handleChange}
                            className='border-gray-500 bg-gray-200 rounded-md p-2 w-full'
                        />
                        {fieldErrors.lastName && (
                            <div className='bg-red-100 text-red-600 rounded-md text-left font-semibold p-2 my-3 col-span-full'>
                                <p>{fieldErrors.lastName}</p>
                            </div>
                        )}
                    </div>
                    <div className="col-span-full">
                        <input
                            type='text'
                            name='email'
                            placeholder='Email'
                            value={formData.email}
                            onChange={handleChange}
                            className='border-gray-500 bg-gray-200 rounded-md p-2 w-full'
                        />
                        {fieldErrors.email && (
                            <div className='bg-red-100 text-red-600 rounded-md text-left font-semibold p-2 my-3 col-span-full'>
                                <p>{fieldErrors.email}</p>
                            </div>
                        )}
                    </div>
                    <div className="grid-cols-2">
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={formData.password}
                            onChange={handleChange}
                            className='border-gray-500 bg-gray-200 rounded-md p-2 w-full'
                        />
                        {fieldErrors.password && (
                            <div className='bg-red-100 text-red-600 rounded-md text-left font-semibold p-2 my-3 col-span-full'>
                                <p>{fieldErrors.password}</p>
                            </div>
                        )}
                    </div>
                    <div className="grid-cols-2">
                        <input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className='border-gray-500 bg-gray-200 rounded-md p-2 w-full'
                        />
                        {fieldErrors.confirmPassword && (
                            <div className='bg-red-100 text-red-600 rounded-md text-left font-semibold p-2 my-3 col-span-full'>
                                <p>{fieldErrors.confirmPassword}</p>
                            </div>
                        )}
                    </div>
                
                    <button
                        type='submit'
                        className='bg-black text-white font-bold rounded-md p-2 col-span-full mt-5 transition duration-100 ease-linear hover:bg-odin-gold active:bg-odin-gold'
                    >
                        Create account
                    </button>
                    <Link to='/login' className='justify-start text-left mt-5 col-span-full'>Already have an account?
                        <span className='text-odin-gold font-bold hover:underline transition duration-100 ease-linear hover:text-black'> Log in here</span>
                    </Link>
                </form>
            </div>
        </section>
    )
}

export default Register;