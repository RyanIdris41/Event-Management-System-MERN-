import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo-sm.png';
import google from '../assets/google.png';

import { useRegisterMutation, useGetCountriesQuery } from '../redux/apis/apiSlice';
import { Select, Input, Form, Button, Spin, Alert } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const RegistrationForm = () => {
    const [form] = Form.useForm();
    const { data: countriesList, isFetching, isSuccess, isError, error } = useGetCountriesQuery();

    const [countries, setCountries] = useState([]);
    const [registerUser, { isLoading }] = useRegisterMutation();
    const [errorMsg, setErrorMessage] = useState('');

    useEffect(() => {
        setCountries(
            (countriesList || []).map((country) => ({ label: country.name, value: country.id }))
        );
    }, [countriesList]);

    const handleSubmit = async (formData) => {
        setErrorMessage('');
        await registerUser(formData).then((data) => {
            if (!data?.data) setErrorMessage(data?.error?.data?.error || 'Something went wrong!');
            else {
                localStorage.setItem('user', JSON.stringify(data.data));
                window.location = '/';
            }
        });
    };

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <div className=" h-auto lg:h-full px-4 w-full lg:w-[45%] flex flex-col items-center overflow-y-auto no-scrollbar ">
            <div className="flex flex-col justify-center items-center">
                <div>
                    <img src={logo} alt="" className="h-11 object-cover" />
                </div>
                <h2 className="font-bold text-2xl">Welcome to Event Pulse</h2>
                <p className="my-1 text-sm text-gray-700">
                    Enter the details below to create an account
                </p>
            </div>
            <Form layout="vertical" form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Please input your name' }]}
                >
                    <Input placeholder="Your full name" className="w-full h-[40px]" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, type: 'email', message: 'Please enter a valid email' },
                    ]}
                >
                    <Input placeholder="Your email" className="w-full h-[40px]" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number' }]}
                >
                    <Input placeholder="Your phone number" className="w-full h-[40px]" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                    hasFeedback
                >
                    <Input.Password className="w-full h-[40px]" />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The new password that you entered do not match!')
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password className="w-full h-[40px]" />
                </Form.Item>
                <Form.Item
                    name="country_id"
                    label="Country"
                    rules={[{ required: true, message: 'Please select a country' }]}
                >
                    <Select
                        className="w-full h-[40px]"
                        showSearch
                        placeholder="Select your country"
                        optionFilterProp="children"
                        filterOption={filterOption}
                        options={countries}
                    />
                </Form.Item>
                <Form.Item className="mb-2">
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="w-full bg-black text-center h-[40px] hover:bg-gray-950"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </Form.Item>
                {errorMsg && <Alert className="my-2" message={errorMsg} type="error" />}
                <div>
                    <button
                        type="button"
                        className="w-full inline-flex items-center justify-center mb-5 py-2 px-4 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        <img src={google} alt="" className="h-6 mr-2" />
                        Sign in with Google
                    </button>
                    Already have an account?
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500 text center mt-2 ml-2"
                    >
                        Login here
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default RegistrationForm;
