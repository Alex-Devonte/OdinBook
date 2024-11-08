import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice.js'
import { Link, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, useRef } from 'react';

function Header() {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const headerRef = useRef(null);
    
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login', {state: {type: 'siteMsg', message: 'Logged out successfully'}});
        window.history.replaceState({}, ''); //Clear location state
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        //Close menu if user clicks outside the header area
        const handleOutsideClick = (e) => {
            if (headerRef.current && !headerRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
    
        document.addEventListener('click', handleOutsideClick);
    
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    });

    return (
      <div
        ref={headerRef}
        className="flex sticky left-0 right-0 top-0 items-center justify-between p-3 mb-4 bg-slate-700 text-white sm:static"
      >
        <div className="flex p-3">
          <Link to="/" className="text-5xl font-bold hover:text-odin-gold">
            OdinBook
          </Link>
        </div>
        <div className="flex items-center gap-5 p-3 text-lg sm:hidden">
          <GiHamburgerMenu onClick={toggleMenu} className="w-6 h-6" />
        </div>
        <div
          id="mobile-menu"
          className={`absolute left-0 right-0 top-24 text-center bg-slate-400 shadow-xl sm:static sm:flex sm:bg-transparent sm:shadow-none gap-5 items-center p-3 text-lg ${
            menuOpen ? "" : "hidden"
          }`}
        >
          <Link
            to="/profile"
            className="flex flex-col sm:flex-row items-center hover:underline gap-3"
          >
            <img
              src={user.profilePicture}
              className="w-8 sm:w-10 h-8 sm:h-10 object-cover object-top rounded-full"
            />
            <p>Hello, {user.firstName}!</p>
          </Link>
          <button onClick={onLogout} className="mt-5 sm:mt-0 hover:underline">
            Logout
          </button>
        </div>
      </div>
    );
}

export default Header;