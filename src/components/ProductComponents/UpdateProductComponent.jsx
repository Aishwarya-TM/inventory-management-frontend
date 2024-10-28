import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateProductComponent.css';

const UpdateProductComponent = ({ product, onClose }) => {
    const [upc, setUpc] = useState(product.upc);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [unit, setUnit] = useState(product.unit);
    const [quantity, setQuantity] = useState(product.quantity);
    const [weight, setWeight] = useState(product.weight);
    const [category, setCategory] = useState(product.category);
    const [price, setPrice] = useState(product.price);
    const [supplier, setSupplier] = useState(product.supplier);
    const [lastUpdated, setLastUpdated] = useState(product.lastUpdated);
    const [sold, setSold] = useState(product.sold);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (product) {
            setUpc(product.upc);
            setName(product.name);
            setDescription(product.description);
            setUnit(product.unit);
            setQuantity(product.quantity);
            setWeight(product.weight);
            setCategory(product.category);
            setPrice(product.price);
            setSupplier(product.supplier);
            setLastUpdated(product.lastUpdated);
            setSold(product.sold);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'upc':
                setUpc(value);
                break;
            case 'name':
                setName(value);
                break;
            case 'description':
                setDescription(value);
                break;
            case 'unit':
                setUnit(value);
                break;
            case 'quantity':
                setQuantity(value);
                break;
            case 'weight':
                setWeight(value);
                break;
            case 'category':
                setCategory(value);
                break;
            case 'price':
                setPrice(value);
                break;
            case 'supplier':
                setSupplier(value);
                break;
            case 'lastUpdated':
                setLastUpdated(value);
                break;
            case 'sold':
                setSold(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productToUpdate = {
            upc, name, description, unit, quantity, weight,
            category, price, supplier, lastUpdated, sold
        };

        try {
            const response = await axios.put(`https://inventory-management-backend-kappa.vercel.app/api/v1/products/update`, productToUpdate);
            const { matchedCount, modifiedCount } = response.data;

            if (matchedCount > 0) {
                setMessage(`Product updated successfully. ${modifiedCount} record(s) modified.`);
            } else {
                setMessage('No product found with the specified UPC.');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Error updating product';
            setMessage(errorMsg);
        }
    };

    return (
        <div className="overlay">
            <div className="form-container">
                <div className="header">
                    <h2>Update Product</h2>
                    <span className="close-icon" onClick={onClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="upc"
                        placeholder="UPC"
                        value={upc}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="unit"
                        placeholder="Unit"
                        value={unit}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="weight"
                        placeholder="Weight"
                        value={weight}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={category}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={price}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="supplier"
                        placeholder="Supplier"
                        value={supplier}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        name="lastUpdated"
                        value={lastUpdated}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="sold"
                        placeholder="Sold Quantity"
                        value={sold}
                        onChange={handleChange}
                    />
                    <button type="submit">Update Product</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default UpdateProductComponent;
