import React from 'react';
import EventCreationForm from '../components/EventForm';
import DashboardLayout from './DashboardLayout'
const NewEvent = () => {
    return (
        <DashboardLayout>
            <h2 className="text-lg px-4 mt-10 mb-4">Create Event</h2>
            <EventCreationForm />
        </DashboardLayout>
    );
};

export default NewEvent;
