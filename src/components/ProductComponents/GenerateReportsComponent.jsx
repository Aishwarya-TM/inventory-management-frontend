import React, { useState } from 'react';
import axios from 'axios';
import './GenerateReportsComponent.css';

const GenerateReportsComponent = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerateReport = async () => {
        try {
            setError(null);
            if (!startDate || !endDate) {
                setError("Start date and end date are required!");
                return;
            }

            const response = await axios.get(`https://inventory-management-backend-kappa.vercel.app/api/v1/products/reports`, {
                params: {
                    startDate,
                    endDate,
                },
            });
            setReport(response.data);
        } catch (error) {
            setError(error.response?.data?.message || "Error generating report");
            setReport(null);
        }
    };

    const handleDownload = () => {
        if (!report) return;

        const csvContent = [
            ["Total Products Added", report.totalProductsAdded],
            ["Total Inventory Value", report.inventoryValue],
            ["Total Sales", report.totalSales],
            ...report.soldItems.map(item => [item.upc, item.name, item.quantitySold, item.salePrice])
        ]
        .map(row => row.join(","))
        .join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'report.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <>
            <div className="generate-reports-container">
                <h2>Generate Reports</h2>
                <div className="date-inputs">
                    <label>
                        Start Date:
                        <input 
                            type="datetime-local" 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                        />
                    </label>
                    <label>
                        End Date:
                        <input 
                            type="datetime-local" 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                        />
                    </label>
                </div>
                <button onClick={handleGenerateReport}>Generate Report</button>
                {error && <p className="error-message">{error}</p>}
                {report && (
                    <div className="report-card">
                        <h3>Report Summary</h3>
                        <table className="summary-table">
                            <tbody>
                                <tr>
                                    <td><strong>Total Products Added:</strong></td>
                                    <td>{report.totalProductsAdded}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Inventory Value:</strong></td>
                                    <td>${report.inventoryValue}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Sales:</strong></td>
                                    <td>{report.totalSales}</td>
                                </tr>
                            </tbody>
                        </table>
                        
                        {report.soldItems && report.soldItems.length > 0 && (
                            <>
                                <h3>Sold Items Details</h3>
                                <table className="sold-items-table">
                                    <thead>
                                        <tr>
                                            <th>UPC</th>
                                            <th>Name</th>
                                            <th>Quantity Sold</th>
                                            <th>Sale Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report.soldItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.upc}</td>
                                                <td>{item.name}</td>
                                                <td>{item.quantitySold}</td>
                                                <td>${item.salePrice}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                )}
            </div>
            <button className="download-button" onClick={handleDownload}>Download</button>
        </>
    );
};

export default GenerateReportsComponent;
