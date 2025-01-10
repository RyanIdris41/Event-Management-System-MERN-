import React from 'react';
import DashboardLayout from './DashboardLayout'
import {useParams} from "react-router-dom";
import EditEventTrackForm from "../components/dashboard/EditEventTrackForm.jsx";
const EditEventTrack = () => {
  const eventTrackId = useParams().id
    return (
        <DashboardLayout>
            <h2 className="text-2xl px-4 mt-10 mb-4">Edit Event Track</h2>
            <EditEventTrackForm eventTrackId={eventTrackId}/>
        </DashboardLayout>
    );
};

export default EditEventTrack;
