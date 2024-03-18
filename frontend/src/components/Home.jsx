import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice.js'  
import CreatePost from './posts/CreatePost.jsx';

function Home() {
    return (
        <>
            <CreatePost />
        </>
    )
}

export default Home;