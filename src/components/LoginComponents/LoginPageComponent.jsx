import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPageComponent.css';

const LoginPageComponent = ({ onLogin }) => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://inventory-management-backend-kappa.vercel.app/api/v1/auth/login', {
                email,
                password,
                role 
            });
    
            const userRole = response.data.role; 
            setMessage(response.data.message);
            onLogin(userRole); 
    
            if (userRole === 'admin') {
                navigate('/admin/dashboard'); 
            } else if (userRole === 'employee') {
                navigate('/employee/dashboard');
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <h1 className="logo">StorEase</h1>
            <h2 className="welcome-message">Good to see you again!</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {message && <p className="message">{message}</p>}
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default LoginPageComponent;
