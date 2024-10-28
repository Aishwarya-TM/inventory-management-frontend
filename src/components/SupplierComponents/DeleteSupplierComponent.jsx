import React, { useState } from 'react';
import axios from 'axios';
import './DeleteSupplierComponent.css'; 

const DeleteSupplierComponent = ({ email, onClose }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const supplierToDelete = { email };

        try {
            const response = await axios.delete('https://inventory-management-backend-kappa.vercel.app/api/v1/suppliers/delete', { data: supplierToDelete });
            setMessage(`Supplier deleted successfully: ${response.data}`);
            onClose(); 
        } catch (error) {
            setMessage(error.response.data.message || 'Error deleting supplier');
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h2>Delete Supplier</h2>
                    <span className="close-icon" onClick={onClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <p>Are you sure you want to delete the supplier with email: <strong>{email}</strong>?</p>
                    <button type="submit">Delete Supplier</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default DeleteSupplierComponent;
