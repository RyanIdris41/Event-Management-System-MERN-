import React, {useEffect, useState} from 'react';
import {Form, Input, Spin, Button, Upload, Select, DatePicker, TimePicker, Alert} from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {useCreateVenueMutation, useGetCountriesQuery} from '../redux/apis/apiSlice';
import {formatDate, getUser} from "../helpers/utils.js";

const { RangePicker } = DatePicker;

const VenueCreationForm = () => {
    const [form] = Form.useForm();
    const { data: countriesList, isFetching, isSuccess, isError, error } = useGetCountriesQuery();
    const [countries, setCountries] = useState(countriesList || []);
    const [createVenue, { isLoading }] = useCreateVenueMutation();
    const [errorMsg, setErrorMessage] = useState("");
    const [infoMsg, setInfoMessage] = useState("")

    useEffect(() => {
        setCountries(
          (countriesList || []).map((country) => ({ label: country.name, value: country.id }))
        );
    }, [countriesList]);

    const onFinish = async (antData) => {
        setErrorMessage("")
        setInfoMessage("")
        await createVenue(antData).then((res)=>{
            if (!res?.data) setErrorMessage(res?.error?.data?.error || 'Something went wrong!');
            else {
                setInfoMessage("Venue successfully created")
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
                name="name"
                label="Venue Name"
                rules={[{ required: true, message: 'Please enter the venue name' }]}
              >
                  <Input className="h-[40px]"/>
              </Form.Item>

              <Form.Item
                name="country_id"
                label="Country"
                rules={[{ required: true, message: 'Please select a country' }]}>
                  <Select
                    className="w-full h-[40px]"
                    showSearch
                    placeholder="Select a venue"
                    optionFilterProp="children"
                    filterOption={filterOption}
                    options={countries}
                  />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: 'Please enter the venue address' }]}
              >
                  <Input className="h-[40px]"/>
              </Form.Item>
              <Form.Item hidden={true}>
                  <Input val/>
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
                        'Create venue'
                      )}
                  </Button>
              </Form.Item>
              {errorMsg && <Alert className="my-2" message={errorMsg} type="error" />}
              {infoMsg && <Alert className="my-2" message={infoMsg} type="success" />}
          </Form>
      </div>
    );
};

export default VenueCreationForm;
