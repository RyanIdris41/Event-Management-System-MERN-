import React, { useState, useEffect } from 'react';

import {Alert, Button, DatePicker, Form, Input, Select, Spin, Upload} from 'antd';
import {DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useDeleteEventTrackMutation, useGetEventDetailsQuery, useGetVenuesQuery, useUpdateEventMutation} from "../../redux/apis/apiSlice.js";
import {formatDate, getUser} from "../../helpers/utils.js";
import dayjs from 'dayjs'
import {useNavigate} from "react-router-dom";

const { RangePicker } = DatePicker;
const EditEventForm = ({eventId}) => {
  const navigate = useNavigate()
  const user = getUser()
  const [form] = Form.useForm();
  const {data: event} = useGetEventDetailsQuery(eventId)
  const { data: venuesList } = useGetVenuesQuery(null, {skip:!event});
  const [venues, setVenues] = useState([]);
  const [updateEvent, { isLoading }] = useUpdateEventMutation();
  const [deleteTrack, { deleteLoading }]  = useDeleteEventTrackMutation();
  const [errorMsg, setErrorMessage] = useState("");
  const [infoMsg, setInfoMessage] = useState("")

  useEffect(() => {
    setVenues(
      (venuesList || []).map((venue) => ({ label: venue.name, value: venue.id }))
    );
  }, [venuesList]);

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const onFinish = async (antData) => {
    if (event.user_id.id !== user.id) {
      setErrorMessage("Permission Denied!")
      return
    }
    setErrorMessage("")
    setInfoMessage("")
    const initial = {
      title: event.title,
      description: event.description,
      venue_id: event.venue_id.id,
      start_date: event.start_date,
      end_date: event.end_date
    }
    if (!antData.banner)
      delete antData.banner
    else
      antData.banner = antData.banner.file.originFileObj
    antData.start_date = formatDate(antData.dates[0].$d)
    antData.end_date = formatDate(antData.dates[1].$d)
    delete antData.dates
    let formData = new FormData()
    for (let key in antData) {
      if (antData.hasOwnProperty(key) && antData[key] && antData[key] !== initial[key]) {
        formData.append(key, antData[key]);
      }
    }
    await updateEvent({eventId:eventId, body:formData}).then((res)=>{
      if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
      else
        setInfoMessage("Event updated successfully")
    })
  }

  const handleDeleteTrack = async (eventTrackId) => {
    setErrorMessage("")
    setInfoMessage("")
    if (event.user_id.id !== user.id) {
      setErrorMessage("Permission denied!")
      return
    }
    await deleteTrack(eventTrackId).then(function (res) {
      if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
      else location.reload()
    })
  }


  return (
    <div className="flex justify-between flex-wrap">
      <div className="lg:h-screen w-full lg:w-1/2 px-4">
        {event && venues && <Form
          form={form}
          initialValues={{
            title: event?.title,
            description: event.description,
            dates: [dayjs(event.start_date), dayjs(event.end_date)],
            venue_id: event.venue_id.id,

          }}
          layout="vertical"
          name="eventCreationForm"
          onFinish={onFinish}
          className="space-y-4"
        >
          <Form.Item
            name="title"
            label="Event Title"
            rules={[{required: true, message: 'Please enter the event title'}]}
          >
            <Input className="h-[40px]"/>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{required: true, message: 'Please enter the event description'}]}
          >
            <Input.TextArea rows={4}/>
          </Form.Item>
          <Form.Item
            name="dates"
            label="Dates"
            rules={[{required: true, message: 'Please select the end date'}]}
          >
            <RangePicker showTime className="h-[40px]"/>
          </Form.Item>
          <Form.Item
            name="banner"
            label="Banner Image"
            rules={[{required: false}]}>
            <Upload
              accept=".jpg, .jpeg, .png"
              maxCount={1}
              label="Image"
              listType="picture-card"
              defaultFileList={[{
                uid: '1',
                name: 'banner',
                status: 'done',
                url: event.banner_url,
                percent: 33
              }]}>
              <button type="button">
                <PlusOutlined/>
                <div style={{marginTop: 8}}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="venue_id"
            label="Venue"
            rules={[{required: true, message: 'Please select a venue'}]}>
            <Select
              className="w-full h-[40px]"
              showSearch
              placeholder="Select a venue"
              optionFilterProp="children"
              filterOption={filterOption}
              options={venues}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-[120px] bg-black text-center h-[40px] hover:bg-gray-950"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
              ) : (
                'Update'
              )}
            </Button>
          </Form.Item>
          {errorMsg && <Alert className="my-2" message={errorMsg} type="error"/>}
          {infoMsg && <Alert className="my-2" message={infoMsg} type="success"/>}
        </Form>}
      </div>

      <div className="w-full lg:w-1/2 px-4">
        <h2 className="mb-4 text-lg">Event Tracks</h2>
        {event?.tracks.map((track, index) => (
          <div key={index}
               className="flex justify-between border-s-8 p-3 border mb-4">
            <div className="flex flex-col">
              <p>{formatDate(track.start_date)}</p>
              <p className="text-primary">{track.title}</p>
              <p>
                {track?.user_id?.name}
                <span
                  className="text-gray-500"><span
                  className="text-2xl mx-2">.</span> {track.duration} hrs
                                  </span>
              </p>

            </div>
            <div className="w-10 float-end flex flex-col justify-between h-full items-end gap-6">
              <span className="text-xl text-gray-700 border-2 border-gray-300 p-1 cursor-pointer" onClick={() => navigate(`/dashboard/edit-event-track/${track.id}`)}>
                <EditOutlined/>
              </span>
              <span className="text-xl text-red-700 border-2 border-red-300 p-1 cursor-pointer" onClick={()=>{handleDeleteTrack(track.id).then(r => {})}}>
                <DeleteOutlined/>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditEventForm;
