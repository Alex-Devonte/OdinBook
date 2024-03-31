import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice.js'
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login', {state: {'siteMsg': 'Logged out successfully'}});
        window.history.replaceState({}, ''); //Clear location state
    }

    return (
        <div className='flex items-center justify-between p-3'>
            <div className='flex p-3'>
                <Link to='/' className='text-5xl font-bold'>OdinBook</Link>
            </div>
            <div className='flex gap-5 items-center p-3'>
                <Link to='/profile' className='flex items-center hover:underline gap-3'>
                    <img src={user.profilePicture} className='w-10 rounded-full'/>
                    <p>Hello, {user.firstName}!</p>
                </Link>
                <button onClick={onLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Header;