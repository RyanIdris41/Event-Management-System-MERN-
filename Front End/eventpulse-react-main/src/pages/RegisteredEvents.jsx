import React from 'react';
import Events from '../components/dashboard/RegisteredEvents';
import DashboardLayout from "./DashboardLayout.jsx";

const RegisteredEvents = () => {
    return (
        <DashboardLayout>
            <Events/>
        </DashboardLayout>
    );
};

export default RegisteredEvents;
