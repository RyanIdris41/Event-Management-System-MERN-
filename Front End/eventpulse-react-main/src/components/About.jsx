import {CodeOutlined, GithubOutlined} from '@ant-design/icons';
import { Twitter } from '@mui/icons-material';
import { Linkedin } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import {Card} from "antd";

const developers = [
    {
        name: 'John Gaitho',
        role: 'FullStack Developer',
        github: 'https://github.com/johngaitho05',
        linkedIn: 'https://www.linkedin.com/in/jgaitho',
        twitter: 'https://twitter.com/jg_programmar',
        avatar: 'https://res.cloudinary.com/da3jmmlpj/image/upload/v1707828462/yk-transparent_h8rqym.png'
    },
];
// Part of landing page
const ProjectInspiration = () => {
    return (
      <div className="max-w-[90rem] mx-auto p-4 my-10 rounded-[8px] mt-20">
          <div className="flex flex-wrap">
              <section className="mb-10 w-full lg:w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-white">The Spark Behind the Project</h2>
                  <p className="text-gray-200 text-md leading-8">

                      The spark for EventPulse ignited from a passion to connect people through
                      memorable events. Recognizing the challenges venues and organizers faced in
                      showcasing and discovering events on a global scale, we set out to create a
                      unified platform. Our goal was to simplify the process of finding and
                      booking venues for both local and international events, making it accessible
                      and seamless for everyone involved. By bridging the gap between venues and
                      event organizers, we aspire to foster a vibrant community where every event,
                      regardless of size or location, can find its perfect space.
                  </p>

                  <div className="mt-8">
                      <Link
                        to="https://github.com/johngaitho05/eventpulse-react"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-white hover:text-blue-600 bg-primary p-3"
                      >
                          <CodeOutlined/> View Source Code
                      </Link>
                  </div>
              </section>

              <section className="mb-10 w-full lg:w-1/2">
                  <h2 className="text-2xl font-bold mb-4 text-center text-white">Developer Info</h2>
                  <div className="px-[10px] lg:px-10">
                      {developers.map((dev, index) => (
                        <Card
                          key={index}
                          className="bg-transparent text-white shadow-lg rounded-lg p-6 flex flex-col items-center w-full max-w-[300px] m-auto text-center"
                        >
                            <div style={{backgroundImage: `url(${dev.avatar})`}} className="w-24 h-24 bg-cover bg-no-repeat rounded-full bg-center m-auto mb-4"/>
                            <h3 className="text-lg font-semibold">{dev.name}</h3>
                            <p className="text-sm mb-4 text-gray-100">{dev.role}</p>
                            <div className="flex space-x-3">
                                <Link
                                  to={dev.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white hover:bg-gray-200 w-12 flex items-center justify-center hover:text-blue-600 bg-[#001e2b] p-[12px] border-2 border-white"
                                >
                                    <GithubOutlined />
                                </Link>
                                <Link
                                  to={dev.linkedIn}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white hover:bg-gray-200 w-12 flex items-center justify-center hover:text-blue-600 bg-[#001e2b] p-[12px] border-2 border-white"
                                >
                                    <Linkedin />
                                </Link>
                                <Link
                                  to={dev.twitter}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white hover:bg-gray-200 w-12 flex items-center justify-center hover:text-blue-600 bg-[#001e2b] p-[12px]  border-2 border-white"
                                >
                                    <Twitter />
                                </Link>
                            </div>
                        </Card>
                      ))}
                  </div>
              </section>
          </div>
      </div>
    );
};

export default ProjectInspiration;
