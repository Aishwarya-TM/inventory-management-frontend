import React, { useState } from 'react';
import axios from 'axios';
import './AddOrderComponent.css';

const AddOrderComponent = ({ onClose }) => {
    const [order, setOrder] = useState({
        clientName: '',
        address: '',
        description: '',
        orderDate: '',
        shipmentDate: '',
        paymentTerms: '',
        deliveryMethod: '',
        products: []
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder({ ...order, [name]: value });
    };

    const addProduct = () => {
        const newProduct = { productName: '', price: '', quantity: '' };
        setOrder({ ...order, products: [...order.products, newProduct] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://inventory-management-backend-kappa.vercel.app/api/v1/orders/add', order);
            setMessage(`Order added: ${response.data.clientName}`);
            setOrder({
                clientName: '',
                address: '',
                description: '',
                orderDate: '',
                shipmentDate: '',
                paymentTerms: '',
                deliveryMethod: '',
                products: []
            });
        } catch (error) {
            setMessage(error.response.data.message || 'Error adding order');
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h1>Add New Order</h1>
                    <span className="close-icon" onClick={onClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="clientName"
                        placeholder="Client Name"
                        value={order.clientName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={order.address}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={order.description}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="orderDate"
                        value={order.orderDate}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="date"
                        name="shipmentDate"
                        value={order.shipmentDate}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="paymentTerms"
                        placeholder="Payment Terms"
                        value={order.paymentTerms}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="deliveryMethod"
                        placeholder="Delivery Method"
                        value={order.deliveryMethod}
                        onChange={handleChange}
                        required
                    />
                    {order.products.map((product, index) => (
                        <div key={index} className="product-entry">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={product.productName}
                                onChange={(e) => {
                                    const newProducts = [...order.products];
                                    newProducts[index].productName = e.target.value;
                                    setOrder({ ...order, products: newProducts });
                                }}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={product.price}
                                onChange={(e) => {
                                    const newProducts = [...order.products];
                                    newProducts[index].price = e.target.value;
                                    setOrder({ ...order, products: newProducts });
                                }}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={product.quantity}
                                onChange={(e) => {
                                    const newProducts = [...order.products];
                                    newProducts[index].quantity = e.target.value;
                                    setOrder({ ...order, products: newProducts });
                                }}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addProduct}>Add Product</button>
                    <button type="submit">Add Order</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default AddOrderComponent;
