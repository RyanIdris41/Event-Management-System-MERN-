import React from 'react';
import Events from '../components/dashboard/UserEvents';
import DashboardLayout from "./DashboardLayout.jsx";

const UserEvents = () => {
    return (
        <DashboardLayout>
            <Events/>
        </DashboardLayout>
    );
};

export default UserEvents;
