import React, { useState } from 'react';
import axios from 'axios';
import './DeleteProductComponent.css';

const DeleteProductComponent = ({ upc, onClose, onDeleteSuccess }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productToDelete = { upc };

        try {
            const response = await axios.delete('https://inventory-management-backend-kappa.vercel.app/api/v1/products/delete', { data: productToDelete });
            setMessage(`Product deleted successfully: ${response.data.deletedCount} product(s) deleted`);
            onDeleteSuccess();
            onClose();
        } catch (error) {
            setMessage(error.response.data.message || 'Error deleting product');
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h2>Delete Product</h2>
                    <span className="close-icon" onClick={onClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <p>Are you sure you want to delete the product with UPC: <strong>{upc}</strong>?</p>
                    <button type="submit">Delete Product</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default DeleteProductComponent;
