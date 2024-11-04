import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './EmployeeDashboardComponent.css';
import LogoutComponent from '../LogoutComponents/LogoutComponent';
const EmployeeDashboardComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const closeDropdown = () => {
        setShowDropdown(false);
    };

    const handleLogoutClick = () => {
        setShowLogoutConfirmation(true);
        closeDropdown();
    };

    return (
        <div className="employee-dashboard-container">
            <nav className="employee-top-navbar">
                <h2>StorEase</h2>
                <span className="employee-welcome-text">
                    Welcome Back! <span role="img" aria-label="wave">👋</span>
                </span>
                <ul>
                    <li>
                        <div className="employee-user-icon-container" onClick={toggleDropdown}>
                            <FaUserCircle />
                        </div>
                        {showDropdown && (
                            <div className="employee-dropdown-menu" onMouseLeave={closeDropdown}>
                                <button onClick={handleLogoutClick} className="employee-dropdown-link">
                                    <FaSignOutAlt /> Logout
                                </button>
                            </div>
                        )}
                    </li>
                </ul>
            </nav>
            <main className="employee-main-content">
                <p className="employee-motto">Streamline, Simplify, Succeed – Elevate Your Inventory Game with StorEase!</p>
                <div className="employee-card-container">
                    <Link to="/employee/products" className="employee-card employee-products" id="products-card">
                        <div className="employee-card-content">
                            <h3 className="employee-card-title">Products</h3>
                        </div>
                    </Link>

                    <Link to="/employee/orders" className="employee-card employee-orders" id="orders-card">
                        <div className="employee-card-content">
                            <h3 className="employee-card-title">Orders</h3>
                        </div>
                    </Link>

                    <Link to="/employee/inventory" className="employee-card employee-inventory-level" id="inventory-card">
                        <div className="employee-card-content">
                            <h3 className="employee-card-title">Track Inventory Level</h3>
                        </div>
                    </Link>

                    <Link to="/employee/report" className="employee-card employee-generate-report" id="report-card">
                        <div className="employee-card-content">
                            <h3 className="employee-card-title">Generate Report</h3>
                        </div>
                    </Link>
                    
                </div>
                <Outlet />
            </main>
            {showLogoutConfirmation && (
                <LogoutComponent onClose={() => setShowLogoutConfirmation(false)} />
            )}
        </div>
    );
};

export default EmployeeDashboardComponent;
