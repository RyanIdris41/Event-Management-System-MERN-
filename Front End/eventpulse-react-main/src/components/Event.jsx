import React from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {CloudinaryImage, formatDate} from '../helpers/utils';
import {Card} from "antd";

// Event Card component
const Event = ({ event }) => {
    const navigate = useNavigate();
    return (
      <Card
        className="border-gray-200 w-[320px] p-0"
        hoverable
        cover={<img src={CloudinaryImage(event.banner_url)} alt="" className="w-full h-[200px] object-cover "/>}
        onClick={() => navigate(`/events/${event.id}`)}
      >
          <div className="flex gap-5 flex-col p-0">
              <h2 className="font-medium text-xl line-clamp-2">{event.title}</h2>
              <p className="line-clamp-4">{event.description}</p>
              <span className="flex gap-3">
                    <CalendarDays size={18} />
                    <p>{formatDate(event.start_date)}</p>
                </span>
              <span className="flex gap-3">
                    <MapPin strokeWidth={3} />
                    <p>{event.venue_id.address}</p>
                </span>
          </div>
      </Card>
    );
};

export default Event;
