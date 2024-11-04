import React, { useState } from 'react';
import axios from 'axios';
import './ProductFilterComponent.css';

const ProductFilterComponent = ({ onClose }) => {
    const [category, setCategory] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [priceMax, setPriceMax] = useState('');
    const [quantityMin, setQuantityMin] = useState('');
    const [quantityMax, setQuantityMax] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState('');
    const [showResults, setShowResults] = useState(false);

    const handleFilter = async () => {
        try {
            setError('');
            const response = await axios.get(
                'https://inventory-management-backend-kappa.vercel.app/api/v1/products/filter',
                { params: { category, priceMin, priceMax, quantityMin, quantityMax } }
            );
            setFilteredProducts(response.data);
            setShowResults(true);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while fetching products.');
            setFilteredProducts([]);
            setShowResults(false);
        }
    };

    const handleBackToFilter = () => {
        setShowResults(false);
    };

    const closeFilter = () => {
        onClose(); 
    };

    return (
        <div className="filter-container">
            <div className="close-icon" onClick={closeFilter}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="red" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
            {showResults ? (
                <div className="product-results">
                    <h3>Filtered Products</h3>
                    <button onClick={handleBackToFilter}>Back to Filter</button>
                    {error && <p className="error">{error}</p>}
                    {filteredProducts.length > 0 ? (
                        <div className="filtered-products-form">
                            {filteredProducts.map((product) => (
                                <div key={product._id} className="product-item">
                                    <h4>{product.name}</h4>
                                    <label>UPC:</label>
                                    <input type="text" value={product.upc} readOnly />
                                    <label>Category:</label>
                                    <input type="text" value={product.category} readOnly />
                                    <label>Price:</label>
                                    <input type="text" value={`$${product.price}`} readOnly />
                                    <label>Quantity:</label>
                                    <input type="text" value={product.quantity} readOnly />
                                    <label>Weight:</label>
                                    <input type="text" value={`${product.weight} kg`} readOnly />
                                    <label>Sold:</label>
                                    <input type="text" value={product.sold} readOnly />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            ) : (
                <div className="filter-form">
                    <h2>Filter Products</h2>
                    <label>Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                    <label>Price Min:</label>
                    <input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} />
                    <label>Price Max:</label>
                    <input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} />
                    <label>Quantity Min:</label>
                    <input type="number" value={quantityMin} onChange={(e) => setQuantityMin(e.target.value)} />
                    <label>Quantity Max:</label>
                    <input type="number" value={quantityMax} onChange={(e) => setQuantityMax(e.target.value)} />
                    <button onClick={handleFilter}>Filter</button>
                    {error && <p className="error">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default ProductFilterComponent;
