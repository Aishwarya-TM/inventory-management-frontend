import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboardComponent from './components/AdminDashboard/AdminDashboardComponent';
import GetAllEmployeeComponent from './components/EmployeeComponents/GetAllEmployeeComponents';
import GetAllSupplierComponent from './components/SupplierComponents/GetAllSupplierComponent';
import GetAllOrderComponent from './components/OrderComponents/GetAllOrderComponent';
import GetAllProductsComponent from './components/ProductComponents/GetAllProductsComponent';
import TrackInventoryComponent from './components/ProductComponents/TrackInventoryComponent';
import GenerateReportsComponent from './components/ProductComponents/GenerateReportsComponent';
import LoginPageComponent from './components/LoginComponents/LoginPageComponent';
import EmployeeDashboardComponent from './components/EmployeeDashboardComponents/EmployeeDashboardComponent';
import LogoutComponent from './components/LogoutComponents/LogoutComponent';

const App = () => {
    const [userRole, setUserRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (role) => {
        setUserRole(role);
        setIsLoggedIn(true);
    };

    const PrivateRoute = ({ children, role }) => {
        if (!isLoggedIn) {
            return <Navigate to="/" />;  
        }

        if (role && userRole !== role) {
            return <Navigate to="/" />;
        }

        return children;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPageComponent onLogin={handleLogin} />} />
                <Route path="/logout" element={<LogoutComponent />} /> 
                
                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute role="admin">
                            <AdminDashboardComponent />
                        </PrivateRoute>
                    }
                />
                <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboardComponent /></PrivateRoute>} />
                <Route path="/admin/employees" element={<PrivateRoute role="admin"><GetAllEmployeeComponent /></PrivateRoute>} />
                <Route path="/admin/suppliers" element={<PrivateRoute role="admin"><GetAllSupplierComponent /></PrivateRoute>} />
                <Route path="/admin/orders" element={<PrivateRoute role="admin"><GetAllOrderComponent /></PrivateRoute>} />
                <Route path="/admin/products" element={<PrivateRoute role="admin"><GetAllProductsComponent /></PrivateRoute>} />
                <Route path="/admin/inventory" element={<PrivateRoute role="admin"><TrackInventoryComponent /></PrivateRoute>} />
                <Route path="/admin/report" element={<PrivateRoute role="admin"><GenerateReportsComponent /></PrivateRoute>} />

                <Route
                    path="/employee/*"
                    element={
                        <PrivateRoute role="employee">
                            <EmployeeDashboardComponent />
                        </PrivateRoute>
                    }
                />
                <Route path="/employee/dashboard" element={<PrivateRoute role="employee"><EmployeeDashboardComponent /></PrivateRoute>} />
                <Route path="/employee/employees" element={<PrivateRoute role="employee"><GetAllEmployeeComponent /></PrivateRoute>} />
                <Route path="/employee/suppliers" element={<PrivateRoute role="employee"><GetAllSupplierComponent /></PrivateRoute>} />
                <Route path="/employee/orders" element={<PrivateRoute role="employee"><GetAllOrderComponent /></PrivateRoute>} />
                <Route path="/employee/products" element={<PrivateRoute role="employee"><GetAllProductsComponent /></PrivateRoute>} />
                <Route path="/employee/inventory" element={<PrivateRoute role="employee"><TrackInventoryComponent /></PrivateRoute>} />
                <Route path="/employee/report" element={<PrivateRoute role="employee"><GenerateReportsComponent /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
