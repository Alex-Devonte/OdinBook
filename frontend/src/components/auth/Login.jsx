import { useState  } from 'react';
import { Link } from 'react-router-dom'

function Login() {
    const [formData, setFormData] = useState({email: '', password: ''});
    
    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = (e) => {

    }

    return (
        <section>
            <h1 className='text-7xl mb-10'>Log In</h1>
            <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-2 w-3/5 mx-auto'>
                <div className='hidden col-span-full text-left mb-5'>Please fix the errors in red: </div>
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

                <div className="col-span-full">
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

                <button 
                    type='submit'
                    className='border-2 border-black p-2 col-span-full'
                >
                    Log In
                </button>
                <Link to='/signup' className='justify-start text-left mt-5'>Don&#39;t have an account? Sign up here</Link>
            </form>
        </section>
    )   
}

export default Login;