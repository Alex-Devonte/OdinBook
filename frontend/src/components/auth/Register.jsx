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
        <section>
            <ToastContainer />
            <h1 className='text-7xl mb-10'>Sign up</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 w-3/5 mx-auto'>
                <div className='grid-cols-2'>
                    <input
                        type='text'
                        name='firstName'
                        placeholder='First name'
                        value={formData.firstName}
                        onChange={handleChange}
                        className='border-2 border-black p-0.5 w-full'
                    />
                    {fieldErrors.firstName && (
                        <div className='text-red-300 text-left'>
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
                        className='border-2 border-black p-0.5 w-full'
                    />
                    {fieldErrors.lastName && (
                        <div className='text-red-300 text-left'>
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
                        className='border-2 border-black p-0.5 w-full'
                    />
                    {fieldErrors.email && (
                        <div className='text-red-300 text-left'>
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
                        className='border-2 border-black p-0.5 w-full'
                    />
                    {fieldErrors.password && (
                        <div className='text-red-300 text-left'>
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
                        className='border-2 border-black p-0.5 w-full'
                    />
                    {fieldErrors.confirmPassword && (
                        <div className='text-red-300 text-left'>
                            <p>{fieldErrors.confirmPassword}</p>
                        </div>
                    )}        
                </div>
                
                <button 
                    type='submit'
                    className='border-2 border-black p-2 col-span-full'
                >
                    Create account
                </button>
                <Link to='/login' className='justify-start text-left mt-5'>Already have an account? Log in here</Link>
            </form>
        </section>
    )
}

export default Register;