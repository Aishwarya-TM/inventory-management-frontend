import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GetAllProductsComponent.css';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import AddProductComponent from './AddProductComponent';
import UpdateProductComponent from './UpdateProductComponent';
import DeleteProductComponent from './DeleteProductComponent';
import RestockProductComponent from './RestockProductComponent';

const GetAllProductsComponent = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddProductVisible, setIsAddProductVisible] = useState(false);
    const [isUpdateProductVisible, setIsUpdateProductVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteProductVisible, setIsDeleteProductVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [isRestockVisible, setIsRestockVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('https://inventory-management-backend-kappa.vercel.app/api/v1/products');
            setProducts(response.data);
            setFilteredProducts(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const results = searchTerm ? products.filter(product => {
            const upcMatch = (typeof product.upc === 'string' && product.upc.trim().includes(searchTerm.trim())) ||
                (typeof product.upc === 'number' && product.upc.toString().includes(searchTerm.trim()));
            const nameMatch = typeof product.name === 'string' && product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = typeof product.category === 'string' && product.category.toLowerCase().includes(searchTerm.toLowerCase());
            const idMatch = product._id.includes(searchTerm); 
            return upcMatch || nameMatch || categoryMatch || idMatch;
        }) : products;

        setFilteredProducts(results);
    }, [searchTerm, products]);

    const toggleAddProduct = () => {
        setIsAddProductVisible(!isAddProductVisible);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setIsUpdateProductVisible(true);
    };

    const handleDeleteProduct = (product) => {
        setProductToDelete(product.upc);
        setIsDeleteProductVisible(true);
    };

    const toggleRestock = () => {
        setIsRestockVisible(!isRestockVisible);
    };

    const closeUpdateProduct = () => {
        setIsUpdateProductVisible(false);
        setSelectedProduct(null);
    };

    const closeDeleteProduct = () => {
        setIsDeleteProductVisible(false);
        setProductToDelete(null);
    };

    const handleDeleteSuccess = () => {
        fetchProducts();
        closeDeleteProduct();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="get-all-products-container">
            <h2>Products List</h2>
            <div className="actions">
                <div className="add-product" onClick={toggleAddProduct}>
                    <FaPlus className="add-icon" title="Add Product" />
                    <span>Add Product</span>
                </div>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search by UPC, Name, Category or Product ID"
                        className="search-input"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <button className="restock-button" onClick={toggleRestock}>Restock</button>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Product ID</th> 
                            <th>Name</th>
                            <th>UPC</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Weight</th>
                            <th>Sold</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={`${product._id}-${index}`} className="product-item">
                                <td>{product._id}</td> 
                                <td>{product.name}</td>
                                <td>{product.upc}</td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.weight} kg</td>
                                <td>{product.sold}</td>
                                <td>
                                    <FaEdit
                                        className="action-icon"
                                        title="Edit"
                                        onClick={() => handleEditProduct(product)}
                                    />
                                    <FaTrash
                                        className="action-icon"
                                        title="Delete"
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => handleDeleteProduct(product)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {isAddProductVisible && (
                <div className="overlay">
                    <AddProductComponent
                        onProductAdded={fetchProducts}
                        onClose={toggleAddProduct}
                    />
                </div>
            )}

            {isUpdateProductVisible && selectedProduct && (
                <div className="overlay">
                    <UpdateProductComponent product={selectedProduct} onClose={closeUpdateProduct} />
                </div>
            )}

            {isDeleteProductVisible && productToDelete && (
                <div className="overlay">
                    <DeleteProductComponent
                        upc={productToDelete}
                        onClose={closeDeleteProduct}
                        onDeleteSuccess={handleDeleteSuccess}
                    />
                </div>
            )}

            {isRestockVisible && (
                <div className="overlay">
                    <RestockProductComponent onClose={toggleRestock} />
                </div>
            )}

        </div>
    );
};

export default GetAllProductsComponent;
