import React, {useEffect, useState} from 'react';
import {Form, Input, Spin, Button, Upload, Select, DatePicker, TimePicker, Alert} from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useCreateEventMutation, useGetVenuesQuery} from '../redux/apis/apiSlice';
import {formatDate, getUser} from "../helpers/utils.js";

const { RangePicker } = DatePicker;

const EventCreationForm = () => {
    const [form] = Form.useForm();
    const { data: venuesList, isFetching, isSuccess, isError, error } = useGetVenuesQuery();
    const [user, setUser] = useState(getUser())
    const [venues, setVenues] = useState([]);
    const [createEvent, { isLoading }] = useCreateEventMutation();
    const [errorMsg, setErrorMessage] = useState("");
    const [infoMsg, setInfoMessage] = useState("")

    useEffect(() => {
        setVenues(
          (venuesList || []).map((venue) => ({ label: venue.name, value: venue.id }))
        );
    }, [venuesList]);

    const onFinish = async (antData) => {
        setErrorMessage("")
        setInfoMessage("")
        antData.user_id = user.id
        antData.banner = antData.banner.file.originFileObj
        antData.start_date = formatDate(antData.dates[0].$d)
        antData.end_date = formatDate(antData.dates[1].$d)
        delete antData.dates
        let formData = new FormData()
        for (let key in antData) {
            if (antData.hasOwnProperty(key)) {
                formData.append(key, antData[key]);
            }
        }
        await createEvent(formData).then((res)=>{
            if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
            else {
                setInfoMessage("Event successfully created")
                form.resetFields()
            }
        })
    };

    const filterOption = (input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
      <div className="px-4 lg:h-screen max-w-[700px]">
          <Form
            form={form}
            layout="vertical"
            name="eventCreationForm"
            onFinish={onFinish}
            className="space-y-4"
          >
              <Form.Item
                name="title"
                label="Event Title"
                rules={[{ required: true, message: 'Please enter the event title' }]}
              >
                  <Input className="h-[40px]"/>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter the event description' }]}
              >
                  <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item
                name="dates"
                label="Dates"
                rules={[{ required: true, message: 'Please select the end date' }]}
              >
                  <RangePicker showTime className="h-[40px]"/>
              </Form.Item>
              <Form.Item
                name="banner"
                label="Banner Image"
                rules={[{ required: true, message: 'Please upload the banner image' }]}>
                  <Upload
                    accept=".jpg, .jpeg, .png"
                    maxCount={1}
                    label="Image"
                    listType="picture-card"
                    rules={[{required: true, message: 'Please upload the banner image'}]}>
                      <button type="button">
                          <PlusOutlined/>
                          <div style={{marginTop: 8}}>Upload</div>
                      </button>
                  </Upload>
              </Form.Item>
              <Form.Item
                name="venue_id"
                label="Venue"
                rules={[{ required: true, message: 'Please select a venue' }]}>
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
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}/>
                      ) : (
                        'create event'
                      )}
                  </Button>
              </Form.Item>
              {errorMsg && <Alert className="my-2" message={errorMsg} type="error" />}
              {infoMsg && <Alert className="my-2" message={infoMsg} type="success" />}
          </Form>
      </div>
    );
};

export default EventCreationForm;
