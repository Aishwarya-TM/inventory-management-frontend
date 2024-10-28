import React, { useState } from 'react';
import './UpdateEmployeeComponent.css';

const UpdateEmployeeComponent = ({ employee, onClose }) => {
    const [employeeData, setEmployeeData] = useState({
        email: employee.email || '',
        phone: employee.phone || '',
        role: employee.role || ''
    });

    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setSuccess(false);

        try {
            const response = await fetch('https://inventory-management-backend-kappa.vercel.app/api/v1/employees/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            });

            if (response.ok) {
                setMessage(`Employee updated successfully!`);
                setSuccess(true);
                setEmployeeData({ email: '', phone: '', role: '' });
            } else {
                const errorResponse = await response.json();
                setMessage(errorResponse.message);
                setSuccess(false);
            }
        } catch (error) {
            setMessage('Error updating employee. Please try again later.');
            setSuccess(false);
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h1>Update Employee</h1>
                    <span className="close-icon" onClick={onClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={employeeData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="Phone" 
                        value={employeeData.phone} 
                        onChange={handleChange} 
                        required 
                    />
                    <select 
                        name="role" 
                        value={employeeData.role} 
                        onChange={handleChange} 
                        required 
                    >
                        <option value="">Select Role</option>
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Update Employee</button>
                    {success && <p className="success-message">{message}</p>}
                </form>
                {message && !success && <p className="error-message">{message}</p>}
            </div>
        </div>
    );
};

export default UpdateEmployeeComponent;
