import { useState, useEffect } from 'react';
import { getUser } from '../../helpers/utils';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    CalendarClock,
    CalendarDays,
    Globe,
    ListTodo,
    MapPin,
    Plus,
    UsersRound,
} from 'lucide-react';
import { useGetEventsQuery } from '../../redux/apis/apiSlice.js';
import Skeleton from "@mui/material/Skeleton";
import * as React from "react";
import Box from "@mui/material/Box";

const CardLoader = () => {
    return (
      <Box className="w-[250px] h-[100px] flex justify-start gap-2 items-center bg-white px-4 border-[1px] rounded-md border-gray-100">
          <Skeleton animation="wave" width={80} height={120} className="bg-gray-600 rounded-[20px]"/>
          <div>
              <Skeleton animation="wave" width={80} height={50} className="bg-gray-600"/>
              <Skeleton animation="wave" width={150} height={30} className="bg-gray-600"/>
          </div>
      </Box>
    )
}

const Summary = () => {
    const navigate = useNavigate();
    const user = getUser()
    const [data, setData] = useState(null);
    let { data: eventsList, isFetching, isSuccess, isError, error } = useGetEventsQuery();

    useEffect(() => {
        if (eventsList) {
            const user_events = eventsList?.filter((event) => {
                return event.user_id.id === user.id;
            });
            const registered_events = eventsList?.filter((event) => {
                return event.attendees.find((_user) => _user.id === user.id);
            });
            const user_past_events = user_events.filter((event) => {
                return new Date(event.start_date) <= new Date();
            });
            const user_upcoming_events = user_events.filter((event) => {
                return new Date(event.start_date) > new Date();
            });
            const registered_past_events = registered_events.filter((event) => {
                return new Date(event.start_date) <= new Date();
            });
            const registered_upcoming_events = registered_events.filter((event) => {
                return new Date(event.start_date) > new Date();
            });
            const registered_users = user_events.reduce(
              (accumulator, event) => accumulator + event.attendees.length,
              0
            );
            setData({
                user_events,
                registered_events,
                user_past_events,
                user_upcoming_events,
                registered_past_events,
                registered_upcoming_events,
                registered_users,
            });
        }
    }, [eventsList]);

    return (
      <div className="flex flex-col  gap-4">
          <div>
              <h2 className="py-2 text-lg">Events you are managing</h2>
              <div className="flex justify-between flex-wrap gap-4">
                  { data ?
                    <Card className="w-full md:w-[250px] h-[100px]   ">
                        <div className="flex justify-start gap-4">
                            <div>
                                <CalendarClock
                                  className="bg-primary  text-white  p-2 rounded-[20px]"
                                  size={55}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-2xl">
                                    {data?.user_past_events?.length}
                                </h2>
                                <p className="capitalize text-gray-600n text-sm">past events</p>
                            </div>
                        </div>
                    </Card>
                    : <CardLoader/>}
                  { data ?
                    <Card className="w-full md:w-[250px] h-[100px]    ">
                        <div className="flex justify-start gap-4 ">
                            <div>
                                <CalendarDays
                                  className="bg-yellow-400  text-white  p-2 rounded-[20px]"
                                  size={55}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-2xl">
                                    {data?.user_upcoming_events?.length}
                                </h2>
                                <p className="capitalize text-gray-600n text-sm">upcoming events</p>
                            </div>
                        </div>
                    </Card>
                    : <CardLoader/>}
                  { data ?
                    <Card className="w-full md:w-[250px] h-[100px]   ">
                        <div className="flex justify-start gap-4">
                            <div>
                                <ListTodo
                                  className="bg-pink-500  text-white  p-2 rounded-[20px]"
                                  size={55}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-2xl">{data?.user_events?.length}</h2>
                                <p className="capitalize text-gray-600n text-sm">all events</p>
                            </div>
                        </div>
                    </Card>
                    : <CardLoader/>}
                  { data ?
                    <Card className="w-full md:w-[250px] h-[100px]   ">
                        <div className="flex justify-start gap-4">
                            <div>
                                <UsersRound
                                  className="bg-green-500  text-white  p-2 rounded-[20px]"
                                  size={55}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="font-bold text-2xl">{data?.registered_users}</h2>
                                <p className="capitalize text-gray-600n text-sm">
                                    registered users
                                </p>
                            </div>
                        </div>
                    </Card>
                    : <CardLoader/>}
              </div>
          </div>

          {/* Registered */}
          <div className="flex justify-between align-middle mt-4 py-2 gap-5  flex-wrap lg:flex-nowrap ">
              <Card className=" w-full lg:w-1/2 py-2">
                  <h2 className="pb-5 text-lg">Events you Registered for</h2>
                  <div className="flex justify-between w-full flex-wrap gap-4">
                      { data ?
                        <Card className="w-full md:w-[250px] h-[100px]   ">
                            <div className="flex justify-start gap-4 ">
                                <div>
                                    <CalendarClock
                                      className="bg-primary text-white p-2 rounded-[20px]"
                                      size={55}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-bold text-2xl">
                                        {data?.registered_past_events?.length}
                                    </h2>
                                    <p className="capitalize text-gray-600">Past Events</p>
                                </div>
                            </div>
                        </Card>
                        : <CardLoader/>}
                      { data ?
                        <Card className="w-full md:w-[250px] h-[100px]   ">
                            <div className="flex justify-start gap-4">
                                <div>
                                    <CalendarDays
                                      className="bg-yellow-400 text-white p-2 rounded-[20px]"
                                      size={55}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-bold text-2xl">
                                        {data?.registered_upcoming_events?.length}
                                    </h2>
                                    <p className="capitalize text-gray-600n text-sm">
                                        Upcoming Events
                                    </p>
                                </div>
                            </div>
                        </Card>
                        : <CardLoader/>}
                  </div>
              </Card>
              <Card className=" w-full lg:w-1/2 py-2">
                  <h2 className="pb-5 text-lg">Recommended Events</h2>
                  <div className="w-full flex justify-between flex-wrap gap-4">
                      { data ?
                        <Card className="w-full md:w-[250px] h-[100px]   ">
                            <div className="flex justify-start gap-4">
                                <div>
                                    <MapPin
                                      className="bg-gray-600 text-white p-2 rounded-[20px]"
                                      size={55}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-bold text-2xl">2</h2>
                                    <p className="capitalize text-gray-600n text-sm">Local</p>
                                </div>
                            </div>
                        </Card>
                        : <CardLoader/>}
                      { data ?
                        <Card className="w-full md:w-[250px] h-[100px]   ">
                            <div className="flex justify-start gap-4">
                                <div>
                                    <Globe
                                      className="bg-blue-400 text-white p-2 rounded-[20px]"
                                      size={55}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h2 className="font-bold text-2xl">8</h2>
                                    <p className="capitalize text-gray-600n text-sm">
                                        International
                                    </p>
                                </div>
                            </div>
                        </Card>
                        : <CardLoader/>}
                  </div>
              </Card>
          </div>

          {/* Actions */}
          <Card className="mt-5 h-auto">
              <h2 className="py-2 text-lg">Quick Actions</h2>
              <div className="flex  gap-4 pt-5 flex-wrap">
                  <button
                    className="px-10 py-8  border-2 border-dashed border-black rounded flex flex-col items-center gap-2 w-full lg:w-auto"
                    onClick={() => {
                        navigate('/dashboard/new-venue');
                    }}
                  >
                      <Plus className="border  p-2" size={40} />
                      Create Venue
                  </button>

                  <button
                    className="px-10 py-8  border-2 border-dashed border-black rounded flex flex-col items-center gap-2  w-full lg:w-auto"
                    onClick={() => {
                        navigate('/dashboard/new-event');
                    }}
                  >
                      <Plus className="border  p-2" size={40} />
                      Create Event
                  </button>
              </div>
          </Card>
      </div>
    );
};

export default Summary;
