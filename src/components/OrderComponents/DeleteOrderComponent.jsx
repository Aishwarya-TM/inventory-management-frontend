import React, { useState } from 'react';
import './DeleteOrderComponent.css';

const DeleteOrderComponent = ({ clientName, orderId, onClose }) => {
    const [message, setMessage] = useState('');

    const handleDelete = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('https://inventory-management-backend-kappa.vercel.app/api/v1/orders/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ _id: orderId }),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(`Order for client ${clientName} has been deleted.`);
                onClose();
            } else {
                const errorResponse = await response.json();
                setMessage(errorResponse.message);
            }
        } catch (error) {
            setMessage('Error deleting order. Please try again later.');
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h2>Delete Order</h2>
                    <span className="close-icon" onClick={onClose}>✖</span>
                </div>
                <form onSubmit={handleDelete}>
                    <p>Are you sure you want to delete the order for client: <strong>{clientName}</strong>?</p>
                    <button type="submit">Delete Order</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default DeleteOrderComponent;
