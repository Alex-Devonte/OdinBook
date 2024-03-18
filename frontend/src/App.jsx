import './App.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from './features/auth/authSlice.js'  
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home.jsx';
import Header from './components/Header.jsx';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
  }

  if (!user) {
    
    return <><p>You cant view this page since you arent logged in</p> <Link to='/login'>LOGOUT</Link></>
  }
  
  return (
    <>
      <Header />
      <Home />
    </>
  )
}

export default App
