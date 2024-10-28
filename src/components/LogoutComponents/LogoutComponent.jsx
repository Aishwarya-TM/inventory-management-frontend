import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './LogoutComponent.css';

const LogoutComponent = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get('/logout', { withCredentials: true });
            document.cookie = 'token=; Max-Age=0; path=/;';
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    useEffect(() => {
        
        const confirmed = window.confirm('Are you sure you want to log out?');
        if (confirmed) {
            handleLogout();
        } else {
            navigate('/'); 
        }
    }, []);

    return null; 
};

export default LogoutComponent;
