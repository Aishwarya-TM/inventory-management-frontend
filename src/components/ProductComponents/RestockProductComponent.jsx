import React, { useState } from 'react';
import axios from 'axios';
import './RestockProductComponent.css';

const RestockProductComponent = ({ onClose }) => {
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleRestockProduct = async () => {
        try {
            setError(null);
            setMessage(null);

            if (!productId || !quantity) {
                setError("Please provide both product ID and quantity.");
                return;
            }

            const response = await axios.post('https://inventory-management-backend-kappa.vercel.app/api/v1/products/restock', {
                _id: productId,
                quantity: Number(quantity)
            });

            setMessage(`Successfully restocked product: ${response.data.name}. New quantity: ${response.data.quantity}`);
            setProductId('');
            setQuantity('');
        } catch (error) {
            setMessage(null);
            setError(error.response?.data?.message || "Error restocking product.");
        }
    };

    return (
        <div className="restock-product-container">
            <div className="close-button" onClick={onClose}>&times;</div>
            <h2>Restock Product</h2>
            <input 
                type="text" 
                placeholder="Enter Product ID" 
                value={productId} 
                onChange={(e) => setProductId(e.target.value)} 
            />
            <input 
                type="number" 
                placeholder="Enter Quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
            />
            <button onClick={handleRestockProduct}>Restock Product</button>

            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default RestockProductComponent;
