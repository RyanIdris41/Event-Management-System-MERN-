import React from 'react';
import EventTrackCreationForm from '../components/EventTrackForm';
import DashboardLayout from './DashboardLayout'
const NewEvent = () => {
    return (
        <DashboardLayout>
            <h2 className="text-lg px-4 mt-10 mb-4">Create Event Track</h2>
            <EventTrackCreationForm />
        </DashboardLayout>
    );
};

export default NewEvent;
