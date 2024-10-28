import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './AdminDashboardComponent.css';

const AdminDashboardComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="admin-dashboard-container">
      <nav className="admin-top-navbar">
        <h2>StorEase</h2>
        <span className="admin-welcome-text">
          Welcome Back! <span role="img" aria-label="wave">👋</span>
        </span>
        <ul>
          <li>
            <div className="admin-user-icon-container" onClick={toggleDropdown}>
              <FaUserCircle />
            </div>
            {showDropdown && (
              <div className="admin-dropdown-menu" onMouseLeave={closeDropdown}>
                <Link to="/logout" className="admin-dropdown-link">
                  <FaSignOutAlt /> Logout
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
      <main className="admin-main-content">
        <p className="admin-motto">Streamline, Simplify, Succeed – Elevate Your Inventory Game with StorEase!</p>
        <div className="admin-card-container">
          <Link to="/admin/products" className="admin-card admin-products" id="products-card">
            <div className="admin-card-content">
              <h3 className="admin-card-title">Products</h3>
            </div>
          </Link>

          <Link to="/admin/suppliers" className="admin-card admin-suppliers" id="suppliers-card">
            <div className="admin-card-content">
              <h3 className="admin-card-title">Suppliers</h3>
            </div>
          </Link>
          
          <Link to="/admin/employees" className="admin-card admin-employees" id="employees-card">
            <div className="admin-card-content">
              <h3 className="admin-card-title">Employees</h3>
            </div>
          </Link>
          
          <Link to="/admin/orders" className="admin-card admin-orders" id="orders-card">
            <div className="admin-card-content">
              <h3 className="admin-card-title">Orders</h3>
            </div>
          </Link>
          
          <Link to="/admin/inventory" className="admin-card admin-inventory-level" id="inventory-card">
            <div className="admin-card-content">
              <h3 className="admin-card-title">Track Inventory Level</h3>
            </div>
          </Link>

          <Link to="/admin/report" className="admin-card admin-generate-report" id="report-card">
            <div className="admin-card-content">
              <h3 className="admin-card-title">Generate Report</h3>
            </div>
          </Link>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboardComponent;
