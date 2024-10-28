import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LogoutComponent = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const confirmed = window.confirm('Are you sure you want to log out?');

        if (confirmed) {
            try {
                await axios.get('/logout', {}, { withCredentials: true });
                document.cookie = 'token=; Max-Age=0; path=/;'; 

                navigate('/');  
            } catch (error) {
                console.error('Error during logout:', error);
            }
        } else {
            console.log('Logout canceled');
        }
    };

    useEffect(() => {
        handleLogout(); 
    }, []);

    return null; 
};

export default LogoutComponent;
