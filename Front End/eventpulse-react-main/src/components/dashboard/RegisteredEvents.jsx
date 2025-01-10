import React, { useEffect, useState } from 'react';
import Event from '../Event';
import { useGetEventsQuery } from '../../redux/apis/apiSlice.js';
import EventLoader from '../../globals/eventLoader';
import {getUser} from "../../helpers/utils.js";

const user = getUser()

const Events = () => {
    let { data: eventsList, isFetching, error } = useGetEventsQuery();

    const [events, setEvents] = useState(eventsList);

    useEffect(() => {
        let registeredEvents = eventsList?.filter((event) => {
            return event.attendees.find(_user => _user.id === user.id);
        });
        setEvents(registeredEvents);
    }, [eventsList]);

    return (
      <div className="w-full pt-20">
          <h1 className="text-2xl">Events you have registered for</h1>
          <div className="grid grid-cols-1 mt-4 py-5 sm:grid-cols-2 md:grid-cols-4 mx-auto w-fit gap-10">
              {events?.map((event) => (
                <Event event={event} key={event.id} />
              ))}
              {isFetching ? <EventLoader count={8} /> : ''}
          </div>
          {!isFetching && !events?.length && <h1 className="w-full text-lg">No events found!</h1>}
      </div>
    );
};

export default Events;
