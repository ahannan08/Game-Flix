import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3004/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // If login is successful, extract and store the token and userId
        const { token, userId } = data.user;

        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', userId);

        console.log('Token', token );
        console.log('userID',userId)

        // Navigate to the home page
        navigate('/');
        setIsLoggedIn(true);
      } else {
        // Handle unsuccessful login
        alert(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleLogout = () => {
    // Clear the authentication token and userId from storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <form id="login-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Login
        </button>
        <button type="button" onClick={handleRegisterClick}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
