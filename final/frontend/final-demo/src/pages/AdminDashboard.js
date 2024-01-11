// In your React component (AdminDashboard.js)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch user data from the API endpoint
    axios.get('/api/admin/users')
      .then(response => {
        setUserData(response.data);
        console.log(userData)

      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [userData]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {userData.map(user => (
        <div key={user.email}>
          <h2>{user.email}</h2>
     
            
          
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
