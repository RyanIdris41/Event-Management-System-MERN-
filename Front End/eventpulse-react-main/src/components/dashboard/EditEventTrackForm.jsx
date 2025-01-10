import React, {useEffect, useState} from 'react';
import {Form, Input, Spin, Button, Upload, Select, DatePicker, Alert, InputNumber} from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import {LoadingOutlined} from '@ant-design/icons';
import {
    useGetEventsQuery,
    useGetEventTrackDetailsQuery,
    useGetUsersQuery,
    useUpdateEventTrackMutation
} from '../../redux/apis/apiSlice';
import {formatDate, getUser} from "../../helpers/utils.js";
import dayjs from "dayjs";

const user = getUser()

const EditEventTrackForm = ({eventTrackId}) => {
    const [form] = Form.useForm();
    const {data: eventTrack} = useGetEventTrackDetailsQuery(eventTrackId);
    const {data: usersList} = useGetUsersQuery(null, {skip: !eventTrack});
    const {data: eventsList} = useGetEventsQuery(null, {skip:!usersList});
    const [updateEventTrack, { isLoading }] = useUpdateEventTrackMutation();
    const [events, setEvents] = useState([]);
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMessage] = useState("");
    const [infoMsg, setInfoMessage] = useState("")

    useEffect(() => {
        if (usersList)
            setUsers((usersList.map((user) => ({ label: user.name + ' - ' + user.email , value: user.id}))))

        if (eventsList) {
            let filteredEvents = eventsList?.filter((event) => {
                return event.user_id.id === user.id;
            });
            setEvents(filteredEvents.map((event) => ({ label: event.title, value: event.id})));
        }
    }, [eventsList, usersList]);

    const onFinish = async (antData) => {
        setErrorMessage("")
        setInfoMessage("")
        antData.start_date = formatDate(antData.start_date.$d)

        await updateEventTrack({eventTrackId: eventTrack.id, body: antData}).then((res)=>{
            if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
            else {
                setInfoMessage("Event Track updated successfully")
            }
        })
    };

    const filterOption = (input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
      <div className="px-4 lg:h-screen max-w-[700px]">
          {eventTrack &&
            <Form
              form={form}
              layout="vertical"
              name="eventCreationForm"
              onFinish={onFinish}
              className="space-y-4"
              initialValues={{
                  title: eventTrack.title,
                  event_id: eventTrack.event_id.id,
                  user_id: eventTrack.user_id?.id || '',
                  start_date: dayjs(eventTrack.start_date),
                  duration: eventTrack.duration,
                  room: eventTrack.room
              }}
            >
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: 'Please enter the event track title' }]}
                >
                    <Input className="h-[40px]"/>
                </Form.Item>
                <Form.Item
                  name="event_id"
                  label="Event"
                  rules={[{ required: true, message: 'Please select an event' }]}
                >
                    <Select
                      className="w-full h-[40px]"
                      showSearch
                      placeholder="Select an event"
                      optionFilterProp="children"
                      filterOption={filterOption}
                      options={events}
                    />
                </Form.Item>
                <Form.Item
                  name="user_id"
                  label="Responsible">
                    <Select
                      className="w-full h-[40px]"
                      showSearch
                      placeholder="Select the responsible user"
                      optionFilterProp="children"
                      filterOption={filterOption}
                      options={users}
                    />
                </Form.Item>
                <Form.Item
                  name="start_date"
                  label="Date & Time"
                  rules={[{ required: true, message: 'Please enter a valid date and time' }]}
                >
                    <DatePicker showTime className="h-[40px]"/>
                </Form.Item>
                <Form.Item
                  name="duration"
                  label="Duration in hrs">
                    <InputNumber
                      step={0.1}
                      placeholder="How long it will take in hrs e.g 1.5"
                      className="w-full h-[40px]"
                    />
                </Form.Item>
                <Form.Item
                  name="room"
                  label="Room Number (optional)">
                    <Input
                      placeholder="Enter the room number e.g B1"
                      className="w-full h-[40px]"
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="max-w-[160px] bg-black text-center h-[40px] hover:bg-gray-950"
                      disabled={isLoading}
                    >
                        {isLoading ? (
                          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}/>
                        ) : (
                          'Update'
                        )}
                    </Button>
                </Form.Item>
                {errorMsg && <Alert className="my-2" message={errorMsg} type="error" />}
                {infoMsg && <Alert className="my-2" message={infoMsg} type="success" />}
            </Form>
          }
      </div>
    );
};

export default EditEventTrackForm;
