import React, { useState } from 'react';
import axios from 'axios';
import './AddSupplierComponent.css'; 

const AddSupplierComponent = ({ onClose }) => {
    const [supplier, setSupplier] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://inventory-management-backend-kappa.vercel.app/api/v1/suppliers/add', supplier);
            setMessage(`Supplier added: ${response.data.name}`);
            setSupplier({ name: '', email: '', phone: '', address: '' }); 
        } catch (error) {
            setMessage(error.response.data.message || 'Error adding supplier');
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h1>Add New Supplier</h1>
                    <span className="close-icon" onClick={onClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Supplier Name"
                        value={supplier.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={supplier.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={supplier.phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={supplier.address}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add Supplier</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default AddSupplierComponent;
