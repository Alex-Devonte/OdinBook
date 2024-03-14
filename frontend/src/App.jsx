import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from './features/auth/authSlice.js'

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  }

  return (
    <>
      <h1 className='text-9xl'>OdinBook</h1>
      {user ?
        (
          <>
            <p>Welcome! You are currently signed in</p>
            <button onClick={onLogout}>Logout</button>  
          </>
        ) : 
        (
          <>
            <p>You aren't logged in</p>
          </>
        )}

    </>
  )
}

export default App
