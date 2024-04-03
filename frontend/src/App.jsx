import './App.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logout, reset } from './features/auth/authSlice.js'  
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home.jsx';
import Header from './components/Header.jsx';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login', {state: {'errorMsg': 'You must be logged in to view that page'}});
      window.history.replaceState({}, '');
    }
  }, [user, navigate]);

  return (
    <>
     {user && (
      <>
        <Header />
        <div id='content-container'>
          <Home />
        </div>
      </>
    )}
    </>
  )
}

export default App
