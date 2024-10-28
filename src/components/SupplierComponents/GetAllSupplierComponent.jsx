import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; 
import AddSupplierComponent from './AddSupplierComponent';
import UpdateSupplierComponent from './UpdateSupplierComponent';
import DeleteSupplierComponent from './DeleteSupplierComponent'; 
import './GetAllSupplierComponent.css';

const GetAllSupplierComponent = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [supplierToEdit, setSupplierToEdit] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('https://inventory-management-backend-kappa.vercel.app/api/v1/suppliers');
                setSuppliers(response.data);
                setFilteredSuppliers(response.data);
            } catch (error) {
                console.error('Error fetching suppliers:', error);
            }
        };
        fetchSuppliers();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const results = suppliers.filter(supplier => 
                (supplier._id && supplier._id.includes(searchTerm)) || 
                (supplier.name && supplier.name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredSuppliers(results);
            setShowSearchResults(results.length > 0);
        } else {
            setFilteredSuppliers(suppliers);
            setShowSearchResults(false);
        }
    }, [searchTerm, suppliers]);

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const handleEdit = (supplier) => {
        setSupplierToEdit(supplier);
        setShowUpdateForm(true);
    };

    const handleDelete = (supplierEmail) => {
        setEmailToDelete(supplierEmail);
        setShowDeleteForm(true);
    };

    const closeUpdateForm = () => {
        setShowUpdateForm(false);
        setSupplierToEdit(null);
    };

    const closeDeleteForm = () => {
        setShowDeleteForm(false);
        setEmailToDelete('');
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="supplier-container">
            <h1>Suppliers List</h1>
            <div className="actions">
                <FaPlus className="add-icon" onClick={toggleAddForm} />
                <span className="add-text" onClick={toggleAddForm}>Add Supplier</span>
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder="Search by Supplier ID or Name" 
                        className="search-input" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                    />
                </div>
            </div>

            {showAddForm && (
                <AddSupplierComponent onClose={toggleAddForm} />
            )}

            {showUpdateForm && (
                <UpdateSupplierComponent supplier={supplierToEdit} onClose={closeUpdateForm} />
            )}

            {showDeleteForm && (
                <DeleteSupplierComponent email={emailToDelete} onClose={closeDeleteForm} />
            )}

            {showSearchResults && (
                <div className="search-results">
                    <h2>Search Results:</h2>
                    <table className="supplier-table">
                        <thead>
                            <tr>
                                <th>Supplier ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSuppliers.map((supplier, index) => (
                                <tr key={`${supplier._id}-${index}`}>
                                    <td>{supplier._id}</td>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.email}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.address}</td>
                                    <td>
                                        <FaEdit className="edit-icon" onClick={() => handleEdit(supplier)} />
                                        <FaTrash className="delete-icon" onClick={() => handleDelete(supplier.email)} style={{ marginLeft: '10px' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!showSearchResults && (
                <table className="supplier-table">
                    <thead>
                        <tr>
                            <th>Supplier ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier, index) => (
                            <tr key={`${supplier._id}-${index}`}>
                                <td>{supplier._id}</td>
                                <td>{supplier.name}</td>
                                <td>{supplier.email}</td>
                                <td>{supplier.phone}</td>
                                <td>{supplier.address}</td>
                                <td>
                                    <FaEdit className="edit-icon" onClick={() => handleEdit(supplier)} />
                                    <FaTrash className="delete-icon" onClick={() => handleDelete(supplier.email)} style={{ marginLeft: '10px' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GetAllSupplierComponent;
