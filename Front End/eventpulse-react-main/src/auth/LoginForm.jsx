import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo-sm.png';
import google from '../assets/google.png';
import {
    useAuthenticateMutation,
} from "../redux/apis/apiSlice";
import {Alert, Button, Form, Input, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const LoginForm = () => {
    const [authenticateUser, { isLoading }] = useAuthenticateMutation()
    const [error, setError] = useState("")
    const [form] = Form.useForm();

    const handleSubmit = async (formData) => {
        setError("")
        await authenticateUser(formData).then(function (data){
            if (!data?.data) {
                setError(data?.error?.data?.error || "Something went wrong!")
            }
            else
            {
                localStorage.setItem('user', JSON.stringify(data.data))
                window.location = '/'
            }
        })
    };
    return (
      <div className=" h-full px-4 w-full lg:w-[45%] flex flex-col items-center ">
          <div className="flex flex-col justify-center items-center">
              <div>
                  <img src={logo} alt="" className="h-11 object-cover" />
              </div>
              <h2 className="font-bold text-2xl">Welcome Back</h2>
              <p className="my-1 text-sm text-gray-700">
                  Enter your email and password to access your account
              </p>
          </div>

          <Form layout="vertical" form={form} onFinish={handleSubmit}>
              <Form.Item name="email" label="Email"  rules={[{
                  required: true,
                  type: "email",
                  message: 'Please enter a valid email'
              }]}>
                  <Input placeholder="Your email" className="w-full h-[40px]"/>
              </Form.Item>
              <Form.Item name="password" label="Password"
                         rules={[{
                             required: true,
                             message: 'Please input your password'
                         }]} hasFeedback>
                  <Input.Password className="w-full h-[40px]"/>
              </Form.Item>
              <Form.Item className="mb-2">
                  <Button type="primary" htmlType="submit"
                          className="w-full bg-black text-center h-[40px] hover:bg-gray-950"
                          disabled={isLoading}>
                      {isLoading ? <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/> : 'Submit'}
                  </Button>
              </Form.Item>
              {error && <Alert className="my-2" message={error} type="error" />}
              <div>
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center mb-5 py-2 px-4 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                      <img src={google} alt="" className="h-6 mr-2"/>
                      Sign in with Google
                  </button>
                  Don't have an account?
                  <Link
                    to="/register"
                    className="font-medium text-indigo-600 hover:text-indigo-500 text center mt-2 ml-2"
                  >
                      Sign Up
                  </Link>
              </div>
          </Form>
      </div>
    );
};

export default LoginForm;
