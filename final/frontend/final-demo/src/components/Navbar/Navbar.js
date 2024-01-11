import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in based on your authentication logic
    // You may use the token stored in localStorage or any other method
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, [setIsLoggedIn]);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="brand">
        <Link to="/">Game<span className='span'>Flix</span></Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {isLoggedIn ? (
          <>
            <Link to="/favgames">Games</Link>
            <button className='button' onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
