import React from 'react';
import EditEventForm from '../components/dashboard/EditEventForm.jsx';
import DashboardLayout from './DashboardLayout'
import {useParams} from "react-router-dom";
const EditEvent = () => {
  const eventId = useParams().id
    return (
        <DashboardLayout>
            <h2 className="text-2xl px-4 mt-10 mb-4">Edit Event</h2>
            <EditEventForm eventId={eventId}/>
        </DashboardLayout>
    );
};

export default EditEvent;
