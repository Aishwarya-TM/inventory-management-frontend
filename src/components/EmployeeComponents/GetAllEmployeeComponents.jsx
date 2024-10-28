import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; 
import AddEmployeeComponent from './AddEmployeeComponent';
import UpdateEmployeeComponent from './UpdateEmployeeComponent';
import DeleteEmployeeComponent from './DeleteEmployeeComponent'; 
import './GetAllEmployeeComponent.css';

const GetAllEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://inventory-management-backend-kappa.vercel.app/api/v1/employees');
                setEmployees(response.data);
                setFilteredEmployees(response.data); 
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const results = employees.filter(employee => 
                employee._id && employee._id.includes(searchTerm)
            );
            setFilteredEmployees(results);
            setShowSearchResults(true); 
        } else {
            setFilteredEmployees(employees);
            setShowSearchResults(false);
        }
    }, [searchTerm, employees]);

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setShowUpdateForm(true);
    };

    const handleDelete = (employeeEmail) => {
        setEmailToDelete(employeeEmail);
        setShowDeleteForm(true); 
    };

    const closeUpdateForm = () => {
        setShowUpdateForm(false);
        setSelectedEmployee(null);
    };

    const closeAddForm = () => {
        setShowAddForm(false);
    };

    const closeDeleteForm = () => {
        setShowDeleteForm(false);
        setEmailToDelete(''); 
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="employee-container">
            <h1>Employee List</h1>
            <div className="actions">
                <FaPlus className="add-icon" onClick={toggleAddForm} />
                <span className="add-text" onClick={toggleAddForm}>Add Employee</span>
                <div className="search-box">
                    <input 
                        type="text" 
                        placeholder="Search Employee ID" 
                        className="search-input" 
                        value={searchTerm} 
                        onChange={handleSearchChange} 
                    />
                </div>
            </div>
            
            {showAddForm && <AddEmployeeComponent onClose={closeAddForm} />}
            {showUpdateForm && <UpdateEmployeeComponent onClose={closeUpdateForm} employee={selectedEmployee} />}
            {showDeleteForm && <DeleteEmployeeComponent email={emailToDelete} onClose={closeDeleteForm} />}

            {showSearchResults && (
                <div className="search-results">
                    <h2>Search Results:</h2>
                    <table className="employee-table">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEmployees.map((employee, index) => (
                                <tr key={index}>
                                    <td>{employee._id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.role}</td>
                                    <td>{employee.isActive ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        <FaEdit className="edit-icon" onClick={() => handleEditClick(employee)} />
                                        <FaTrash className="delete-icon" onClick={() => handleDelete(employee.email)} style={{ marginLeft: '10px' }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {!showSearchResults && !searchTerm && (
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <td>{employee._id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.role}</td>
                                <td>{employee.isActive ? 'Active' : 'Inactive'}</td>
                                <td>
                                    <FaEdit className="edit-icon" onClick={() => handleEditClick(employee)} />
                                    <FaTrash className="delete-icon" onClick={() => handleDelete(employee.email)} style={{ marginLeft: '10px' }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GetAllEmployeeComponent;
