import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './LogoutComponent.css';

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

    return (
        <div className="logout-confirmation">
            <div className="logout-dialog">
                <h3>Logout Confirmation</h3>
                <p>Are you sure you want to log out?</p>
                <div className="logout-buttons">
                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                    <button className="cancel-button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default LogoutComponent;
