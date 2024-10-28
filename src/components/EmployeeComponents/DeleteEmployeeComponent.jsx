import React, { useState } from 'react';
import './DeleteEmployeeComponent.css';

const DeleteEmployeeComponent = ({ email, onClose }) => {
    const [message, setMessage] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('https://inventory-management-backend-kappa.vercel.app/api/v1/employees/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(`Employee deleted successfully: ${email}`);
                onClose(); 
            } else {
                const errorResponse = await response.json();
                setMessage(errorResponse.message);
            }
        } catch (error) {
            setMessage('Error deleting employee. Please try again later.');
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h2>Delete Employee</h2>
                    <span className="close-icon" onClick={onClose}>✖</span>
                </div>
                <form onSubmit={handleDelete}>
                    <p>Are you sure you want to delete the employee with email: <strong>{email}</strong>?</p>
                    <button type="submit">Delete Employee</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default DeleteEmployeeComponent;
