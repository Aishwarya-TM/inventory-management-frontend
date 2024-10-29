import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './LogoutComponent.css';

const LogoutComponent = ({ onLogout = () => {} }) => {  
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(true);

    const handleLogout = async () => {
        try {
            await axios.get('/logout', { withCredentials: true });
            document.cookie = 'token=; Max-Age=0; path=/;';
            onLogout();  
            navigate('/'); 
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleYes = () => {
        handleLogout();
    };

    const handleNo = () => {
        setShowConfirmation(false);
    };

    return (
        showConfirmation && (
            <div className="logout-overlay">
                <div className="logout-dialog">
                    <h3>Logout Confirmation</h3>
                    <p>Do you want to log out? Are you sure?</p>
                    <div className="logout-buttons">
                        <button className="yes-button" onClick={handleYes}>Logout</button>
                        <button className="no-button" onClick={handleNo}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default LogoutComponent;
