import React, {useState} from 'react';
import {CalendarDays, MapPin} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {CloudinaryImage, formatDate, getUser} from '../../helpers/utils.js';
import {Card, Modal} from "antd";
import {DeleteFilled, EditFilled, EyeOutlined} from "@ant-design/icons";
import {useDeleteEventMutation} from "../../redux/apis/apiSlice.js";

const user = getUser()

const Event = ({ event }) => {
  const navigate = useNavigate();
  const [deleteEvent, { deleteLoading }] = useDeleteEventMutation();
  const [errorMsg, setErrorMessage] = useState("")
  const [isModalOpen, setIsModalOpen] = useState([false, false]);

  const modalStyles = {
    header: {
      borderRadius: 0,
      paddingInlineStart: 5,
    },
    mask: {
      backdropFilter: 'blur(10px)',
    },
    content: {
      boxShadow: '0 0 30px #999',
    },
    body: {
      padding: '1rem'
    }
  };

  const toggleModal = (idx, target) => {
    setIsModalOpen((p) => {
      p[idx] = target;
      return [...p];
    });
  };

  const handleDelete = async () => {
    if (event.user_id.id !== user.id) {
      setErrorMessage("Permission Denied!")
      return
    }
    setErrorMessage("")
    if (event.user_id.id !== user.id) {
      setErrorMessage("Permission denied!")
      return
    }
    await deleteEvent(event.id).then(function (res) {
      if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
      else location.reload()
    })
  }

  return (
    <Card
      className="border-gray-200 w-[320px] p-0"
      cover={<img src={CloudinaryImage(event.banner_url)} alt="" className="w-full h-[200px] object-cover "/>}
    >
      <div className="flex gap-5 flex-col p-0">
        <div>
          <span className="p-2 bg-gray-950 text-white font-bold cursor-pointer" title="Edit" onClick={() => {navigate(`/dashboard/my-events/${event.id}`)}}><EditFilled/></span>
          <span className="p-2 bg-red-600 text-white ml-4 font-bold cursor-pointer" onClick={handleDelete} title="Delete"><DeleteFilled/></span>
          <span className="p-2 bg-white border-2 ml-4 font-bold cursor-pointer" onClick={() => {navigate(`/events/${event.id}`)}} title="Preview"><EyeOutlined/></span>
          <span className="float-end">{event?.attendees?.length ?
            <span className="cursor-pointer hover:underline" onClick={() => toggleModal(0, true)}><strong>{event?.attendees?.length}</strong> Attendees</span> : '0 Attendees'}</span>
        </div>
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
      <Modal
        className="lg: min-w-[500px]"
        title={`Event Attendees - ${event.title}`}
        open={isModalOpen[0]}
        onOk={() => toggleModal(0, false)}
        onCancel={() => toggleModal(0, false)}
        footer=""
        styles={modalStyles}
      >
        <ol className="list-decimal lg-min">
          {event?.attendees.map((user)=> (<li><strong>{user.name}</strong> - {user.email} | {user.phone}</li>))}
        </ol>
      </Modal>
    </Card>
  );
};

export default Event;
