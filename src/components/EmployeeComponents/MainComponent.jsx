import React, { useState } from 'react';
import GetAllEmployeeComponent from './GetAllEmployeeComponent';
import AddEmployeeComponent from './AddEmployeeComponent'; // Adjust the import path

const MainComponent = () => {
    const [showAddEmployee, setShowAddEmployee] = useState(false);

    return (
        <div>
            <GetAllEmployeeComponent onAddClick={() => setShowAddEmployee(true)} />
            {showAddEmployee && (
                <AddEmployeeComponent onClose={() => setShowAddEmployee(false)} />
            )}
        </div>
    );
};

export default MainComponent;
