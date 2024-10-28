import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; 
import './AddEmployeeComponent.css';

const AddEmployeeComponent = ({ onClose }) => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        phone: '',
        role: '', 
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('https://inventory-management-backend-kappa.vercel.app/api/v1/employees/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employeeData)
            });

            if (response.ok) {
                const newEmployee = await response.json();
                setMessage(`Employee added successfully: ${newEmployee.email}`);
                setEmployeeData({ name: '', email: '', phone: '', role: '', password: '' });
            } else {
                const errorResponse = await response.json();
                setMessage(errorResponse.message);
            }
        } catch (error) {
            setMessage('Error adding employee. Please try again later.');
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h1>Add New Employee</h1>
                    <FaTimes className="close-icon" onClick={onClose} />
                </div>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={employeeData.name} 
                        onChange={handleChange} 
                        required 
                    />
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
                        <option value="" disabled>Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={employeeData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit">Add Employee</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default AddEmployeeComponent;
