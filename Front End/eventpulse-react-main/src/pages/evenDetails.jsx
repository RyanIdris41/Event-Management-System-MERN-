import React from 'react';
import Event from '../components/EventDetails';
import {useParams} from "react-router-dom";
import Layout from './Layout';
const EventDetails = () => {
  const eventId = useParams().id
    return (
        <Layout>
            <Event eventId={eventId}/>
        </Layout>
    );
};

export default EventDetails;
