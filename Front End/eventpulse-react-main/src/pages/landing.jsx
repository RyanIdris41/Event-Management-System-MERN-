import React from 'react';
import Hero from '../components/hero';
import Benefits from '../components/Benefits';
import Layout from './Layout';
import Slider from '../components/Slider';
import ProjectInspiration from '../components/About';

const Landing = () => {
    return (
        <Layout>
            <Hero />
            <div className="bg-[#001e2b] relative z-50 pt-10 pb-5 h-auto">
                <Benefits />
                <Slider />
                <ProjectInspiration />
            </div>
        </Layout>
    );
};

export default Landing;
