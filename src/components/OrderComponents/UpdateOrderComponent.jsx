import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateOrderComponent.css';

const UpdateOrderComponent = ({ orderId, onClose }) => {
    const [order, setOrder] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            if (orderId) {
                try {
                    const response = await axios.get(`https://inventory-management-backend-kappa.vercel.app/api/v1/orders/search/${orderId}`);
                    setOrder(response.data);
                    setUpdatedOrder(response.data);
                } catch (err) {
                    setError(err.response ? err.response.data.message : "Error fetching the order");
                }
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedOrder({ ...updatedOrder, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');

        try {
            const orderWithId = { ...updatedOrder, _id: orderId };
            const response = await axios.put(`https://inventory-management-backend-kappa.vercel.app/api/v1/orders/update`, orderWithId);
            setMessage('Order updated successfully!');
            setOrder(response.data);
        } catch (err) {
            setError(err.response ? err.response.data.message : "Error updating the order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h2>Update Order</h2>
                    <span className="close-icon" onClick={onClose}>&times;</span>
                </div>
                {error && <p className="error-message">{error}</p>}
                {order && (
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Order ID:</label>
                            <input type="text" value={orderId} readOnly />
                        </div>
                        <div>
                            <label>Client Name:</label>
                            <input
                                type="text"
                                name="clientName"
                                value={updatedOrder.clientName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={updatedOrder.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={updatedOrder.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Payment Terms:</label>
                            <input
                                type="text"
                                name="Paymentterms"
                                value={updatedOrder.Paymentterms}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Delivery Method:</label>
                            <input
                                type="text"
                                name="deliverymethod"
                                value={updatedOrder.deliverymethod}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Order'}
                        </button>
                    </form>
                )}
                {message && <p className="success-message">{message}</p>}
            </div>
        </div>
    );
};

export default UpdateOrderComponent;
