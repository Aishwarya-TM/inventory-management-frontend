import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import AddOrderComponent from './AddOrderComponent';
import UpdateOrderComponent from './UpdateOrderComponent';
import DeleteOrderComponent from './DeleteOrderComponent';
import './GetAllOrderComponent.css';

const GetAllOrderComponent = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddOrder, setShowAddOrder] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [showUpdateOrder, setShowUpdateOrder] = useState(false);
    const [showDeleteOrder, setShowDeleteOrder] = useState(false);
    const [clientName, setClientName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('https://inventory-management-backend-kappa.vercel.app/api/v1/orders');
            setOrders(response.data);
            setFilteredOrders(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const results = orders.filter(order => 
                order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order._id.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredOrders(results);
            setShowSearchResults(true);
        } else {
            setFilteredOrders(orders);
            setShowSearchResults(false);
        }
    }, [searchTerm, orders]);

    const handleAddOrderClose = () => {
        setShowAddOrder(false);
        fetchOrders();
    };

    const handleEditClick = (orderId) => {
        setSelectedOrderId(orderId);
        setShowUpdateOrder(true);
    };

    const handleDeleteClick = (orderId, clientName) => {
        setSelectedOrderId(orderId);
        setClientName(clientName);
        setShowDeleteOrder(true);
    };

    const handleUpdateOrderClose = () => {
        setShowUpdateOrder(false);
        setSelectedOrderId(null);
        fetchOrders();
    };

    const handleDeleteOrderClose = () => {
        setShowDeleteOrder(false);
        setSelectedOrderId(null);
        setClientName('');
        fetchOrders();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="order-container">
            <h2 className="order-title">Orders List</h2>
            <div className="actions">
                <FaPlus className="add-icon" onClick={() => setShowAddOrder(true)} />
                <span className="add-text" onClick={() => setShowAddOrder(true)}>Add Order</span>
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder="Search by Order ID, Client Name, or Description" 
                        className="search-input" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                    />
                </div>
            </div>
            {showAddOrder && <AddOrderComponent onClose={handleAddOrderClose} />}
            {showUpdateOrder && <UpdateOrderComponent orderId={selectedOrderId} onClose={handleUpdateOrderClose} />}
            {showDeleteOrder && <DeleteOrderComponent clientName={clientName} orderId={selectedOrderId} onClose={handleDeleteOrderClose} />}
            {showSearchResults && (
                <div className="search-results">
                    <h2>Search Results:</h2>
                    <table className="order-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Client Name</th>
                                <th>Address</th>
                                <th>Description</th>
                                <th>Order Date</th>
                                <th>Shipment Date</th>
                                <th>Payment Terms</th>
                                <th>Delivery Method</th>
                                <th>Products</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.clientName}</td>
                                    <td>{order.address}</td>
                                    <td>{order.description}</td>
                                    <td>{new Date(order.orderdate).toLocaleDateString()}</td>
                                    <td>{new Date(order.expectedshipmentdate).toLocaleDateString()}</td>
                                    <td>{order.Paymentterms}</td>
                                    <td>{order.deliverymethod}</td>
                                    <td>
                                        <ul>
                                            {order.products.map((product) => (
                                                <li key={product._id}>
                                                    {product.productName} - ${product.price.toFixed(2)} x {product.quantity}
                                                </li>
                                            ))} 
                                        </ul>
                                    </td>
                                    <td>
                                        <FaEdit className="edit-icon" onClick={() => handleEditClick(order._id)} />
                                        <FaTrash className="delete-icon" style={{ marginLeft: '10px' }} onClick={() => handleDeleteClick(order._id, order.clientName)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {!showSearchResults && (
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Client Name</th>
                            <th>Address</th>
                            <th>Description</th>
                            <th>Order Date</th>
                            <th>Shipment Date</th>
                            <th>Payment Terms</th>
                            <th>Delivery Method</th>
                            <th>Products</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.clientName}</td>
                                <td>{order.address}</td>
                                <td>{order.description}</td>
                                <td>{new Date(order.orderdate).toLocaleDateString()}</td>
                                <td>{new Date(order.expectedshipmentdate).toLocaleDateString()}</td>
                                <td>{order.Paymentterms}</td>
                                <td>{order.deliverymethod}</td>
                                <td>
                                    <ul>
                                        {order.products.map((product) => (
                                            <li key={product._id}>
                                                {product.productName} - ${product.price.toFixed(2)} x {product.quantity}
                                            </li>
                                        ))} 
                                    </ul>
                                </td>
                                <td>
                                    <FaEdit className="edit-icon" onClick={() => handleEditClick(order._id)} />
                                    <FaTrash className="delete-icon" style={{ marginLeft: '10px' }} onClick={() => handleDeleteClick(order._id, order.clientName)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GetAllOrderComponent;
