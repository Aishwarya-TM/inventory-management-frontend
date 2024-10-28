import React, { useState } from 'react';
import axios from 'axios';
import './TrackInventoryComponent.css';

const TrackInventoryComponent = () => {
    const [lowStockThreshold, setLowStockThreshold] = useState('');
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    const handleTrackInventory = async () => {
        try {
            setError(null);
            if (!lowStockThreshold) {
                setError("Please enter a low stock threshold!");
                return;
            }

            const response = await axios.get(`https://inventory-management-backend-kappa.vercel.app/api/v1/products/track/search`, {
                params: { lowStockThreshHold: lowStockThreshold },
            });
            setProducts(response.data);
        } catch (error) {
            setProducts([]);
            setError(error.response?.data?.message || "Error tracking inventory");
        }
    };

    return (
        <div className="track-inventory-container">
            <h2>Track Inventory Level</h2>

            <div className="input-button-container">
                <input
                    type="number"
                    placeholder="Enter Low Stock Threshold"
                    value={lowStockThreshold}
                    onChange={(e) => setLowStockThreshold(e.target.value)}
                />
                <button onClick={handleTrackInventory}>Track Inventory</button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {products.length > 0 && (
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>UPC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.quantity}</td>
                                <td>{product.upc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TrackInventoryComponent;
