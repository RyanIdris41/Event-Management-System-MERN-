import React from 'react';
import DashboardLayout from './DashboardLayout'
import VenueCreationForm from "../components/VenueForm.jsx";
const NewVenue = () => {
    return (
        <DashboardLayout>
            <h2 className="text-lg px-4 mt-10 mb-4">Create Venue</h2>
            <VenueCreationForm />
        </DashboardLayout>
    );
};

export default NewVenue;
