import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import local from '../assets/venue.jpg';
import globe from '../assets/globe.jpg';
import venue from '../assets/events.jpg';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
    const [index, setIndex] = useState(0);
    const [isHidden, setIsHidden] = useState(true);

    const slides = [
        {
            image: globe,
            alt: 'Image 1',
            text: 'Attend Global Events',
        },
        {
            image: local,
            alt: 'Image 2',
            text: 'Attend Local Events',
        },
        {
            image: venue,
            alt: 'Image 3',
            text: 'Manage Your Venue',
        },
    ];

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
            setIsHidden(false);
        }, 3000);

        return () => clearInterval(interval);
    }, [index]);

    const navigate = useNavigate();

    return (
        <div className="flex bg-[#061621] mt-5 py-2 max-w-[90rem] mx-auto rounded-[8px] p-4 items-center justify-center flex-wrap">
            {/* right */}

            <div className="w-full lg:w-1/2">
                <p className="text-white my-2 text-2xl font-bold lg:pr-[3rem] w-full">
                    What can you do On our platform ?
                </p>

                <ol className="list-disc text-white text-base p-1">
                    <li>Create and Manage events</li>
                    <li>Create and Manage venues</li>
                    <li>Register to local and International events</li>
                </ol>

                <button
                    className="mt-10 mb-10 text-white  border border-primary px-5 py-3 rounded font-semibold transition duration-300 ease-in-out hover:bg-red-600"
                    onClick={() => navigate('/events')}
                >
                    Explore Events
                </button>
            </div>

            {/* slider */}

            <div className="relative w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                    <AnimatePresence custom={index}>
                        {slides.map((slide, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-0 left-0 w-full h-full flex justify-center items-center"
                                style={{
                                    opacity: i === index ? 1 : 0,
                                    zIndex: i === index ? 1 : 0,
                                }}
                                initial={{ opacity: 0, x: '100%' }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    className="w-full h-full object-cover rounded-full object-center "
                                />
                                <div className="absolute h-full w-full rounded-full flex items-center justify-center p-4 bg-[rgba(0,0,0,0.5)] bg-opacity-50 text-white text-center font-semibold text-xl">
                                    {slide.text}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2"
                    onClick={prevSlide}
                >
                    Previous
                </button>
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2"
                    onClick={nextSlide}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Slider;
