import React from 'react';
import './logoutcomponent.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutComponent = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Get the token from localStorage (or wherever you store it)
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error("No auth token found");
        navigate('/');
        return;
      }

      // Add token to headers
      await axios.get('https://inventory-management-backend-kappa.vercel.app/api/v1/auth/logout', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Clear token and navigate to login
      localStorage.removeItem('authToken');
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error (e.g., display message, retry, etc.)
    }
  };

  return (
    <div className="logout-overlay">
      <div className="logout-dialog">
        <h3>Are you sure you want to logout?</h3>
        <p>Your session will be ended.</p>
        <div className="logout-buttons">
          <button className="yes-button" onClick={handleLogout}>Yes</button>
          <button className="no-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutComponent;
