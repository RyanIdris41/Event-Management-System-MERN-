import React, { useEffect, useState } from 'react';
import Event from './Event';
import { Search } from 'lucide-react';
import clap from '../assets/people.jpg';
import { useGetEventsQuery } from '../redux/apis/apiSlice.js';
import EventLoader from '../globals/eventLoader';

const Events = ({ simplified, nosearch }) => {
    let { data: eventsList, isFetching, isSuccess, isError, error } = useGetEventsQuery();

    const [events, setEvents] = useState(eventsList);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        let filteredEvents;

        if (simplified) filteredEvents = eventsList?.slice(0, 8);
        else
            filteredEvents = eventsList?.filter((event) => {
                return event.title.toLowerCase().includes(searchTerm.toLowerCase());
            });
        setEvents(filteredEvents);
    }, [eventsList, searchTerm]);

    return (
        <div className="w-full">
            {nosearch ? (
                ''
            ) : (
                <div className="relative flex justify-center items-center text-center h-[50vh] w-[full] ">
                    <img src={clap} alt="" className="w-full h-full object-cover " />
                    <div className="absolute w-full h-full bg-[rgba(0,0,0,0.6)] flex  items-center justify-center  flex-col">
                        <h1 className="text-4xl font-medium text-primary">All Events</h1>
                        <div className="relative mt-4">
                            <input
                                type="text"
                                placeholder="Search for events"
                                className="p-2 w-[90vw]  md:w-[40vw] rounded-e-3xl"
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                }}
                            />
                            <button className="bg-[#e75022] rounded-3xl py-2 px-6 absolute right-0 top-0 flex text-white font-bold">
                                <Search /> Search
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="grid grid-cols-1 mt-4 py-5 sm:grid-cols-2 md:grid-cols-4 mx-auto w-fit gap-10">
                {events?.map((event) => (
                    <Event event={event} key={event.id} />
                ))}
                {isFetching ? <EventLoader count={8} /> : ''}
                {!isFetching && !events?.length && <h1 className="w-full text-left text-3xl">No events found</h1>}
            </div>
        </div>
    );
};

export default Events;
