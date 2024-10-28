import React, { useState } from 'react';
import axios from 'axios';
import './AddProductComponent.css';

const AddProductComponent = ({ onProductAdded, onClose }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        unit: '',
        quantity: 0,
        upc: '',
        weight: 0,
        category: '',
        price: 0,
        supplier: '',
        dateAdded: '',
        lastUpdated: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://inventory-management-backend-kappa.vercel.app/api/v1/products/add', product);
            
            if (response.data && response.data.name) {
                setSuccessMessage(`Product "${response.data.name}" added successfully.`);
            } else {
                setSuccessMessage("Product added successfully.");
            }
            
            setProduct({
                name: '',
                description: '',
                unit: '',
                quantity: 0,
                upc: '',
                weight: 0,
                category: '',
                price: 0,
                supplier: '',
                dateAdded: '',
                lastUpdated: '',
            });
            onProductAdded();
        } catch (error) {
            console.error(error);
            setSuccessMessage(`Error adding product: ${error.response?.data?.message || 'Unknown error'}`);
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h2>Add New Product</h2>
                    <span className="close-icon" onClick={onClose}>×</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input type="text" id="name" name="name" value={product.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" id="description" name="description" value={product.description} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="unit">Unit</label>
                        <input type="text" id="unit" name="unit" value={product.unit} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input type="number" id="quantity" name="quantity" value={product.quantity} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="upc">UPC</label>
                        <input type="text" id="upc" name="upc" value={product.upc} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Weight</label>
                        <input type="number" id="weight" name="weight" value={product.weight} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" name="category" value={product.category} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" name="price" value={product.price} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="supplier">Supplier</label>
                        <input type="text" id="supplier" name="supplier" value={product.supplier} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateAdded">Date Added</label>
                        <input type="date" id="dateAdded" name="dateAdded" value={product.dateAdded} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastUpdated">Last Updated</label>
                        <input type="date" id="lastUpdated" name="lastUpdated" value={product.lastUpdated} onChange={handleChange} />
                    </div>
                    <button type="submit">Add Product</button>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
};

export default AddProductComponent;
