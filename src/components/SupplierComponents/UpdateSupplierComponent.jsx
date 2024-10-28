import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateSupplierComponent.css'; 

const UpdateSupplierComponent = ({ supplier, onClose }) => {
    const [email, setEmail] = useState(supplier.email);
    const [name, setName] = useState(supplier.name);
    const [phone, setPhone] = useState(supplier.phone);
    const [address, setAddress] = useState(supplier.address);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (supplier) {
            setEmail(supplier.email);
            setName(supplier.name);
            setPhone(supplier.phone);
            setAddress(supplier.address);
        }
    }, [supplier]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'address':
                setAddress(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const supplierToUpdate = { email, name, phone, address };

        try {
            const response = await axios.put('https://inventory-management-backend-kappa.vercel.app/api/v1/suppliers/update', supplierToUpdate);
            setMessage(`Supplier updated successfully: ${response.data}`);
            onClose(); 
        } catch (error) {
            setMessage(error.response.data.message || 'Error updating supplier');
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h2>Update Supplier</h2>
                    <span className="close-icon" onClick={onClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Supplier Email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Supplier Name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Supplier Phone"
                        value={phone}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Supplier Address"
                        value={address}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Update Supplier</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default UpdateSupplierComponent;
