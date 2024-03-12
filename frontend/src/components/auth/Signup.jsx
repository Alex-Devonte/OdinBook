import { useState } from 'react';
import { Link } from 'react-router-dom'

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '', 
        email: '', 
        password: '', 
        confirmPassword: ''});

    const handleSubmit = (e) => {

    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <section>
            <h1 className='text-7xl mb-10'>Sign up</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 w-3/5 mx-auto'>
                <div className='hidden col-span-full text-left mb-5'>Please fix the errors in red: </div>
                <div className='grid-cols-2'>
                    <input
                        type='text'
                        name='firstName'
                        placeholder='First name'
                        value={formData.firstName}
                        onChange={handleChange}
                        className='border-2 border-black p-0.5 w-full'
                    />
                    <div
                        className='hidden text-red-300 text-left'>
                        Error
                    </div>
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
                    <div 
                        className='hidden text-red-300 text-left'>
                        Error
                    </div>
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
                    <div 
                        className='hidden text-red-300 text-left'>
                        Error
                    </div>
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
                    <div 
                        className='hidden text-red-300 text-left'>
                        Error
                    </div>
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
                    <div 
                        className='hidden text-red-300 text-left'>
                        Error
                    </div>
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

export default Signup;