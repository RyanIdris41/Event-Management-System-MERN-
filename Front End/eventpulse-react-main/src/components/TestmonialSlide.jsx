import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Slider = () => {
    const avatar =
        'https://img.freepik.com/premium-photo/portrait-young-cute-african-woman_144962-8903.jpg?size=626&ext=jpg&uid=R78813795&ga=GA1.1.1961618914.1698752855&semt=ais';

    const [testimonials, setTestimonials] = useState([
        {
            id: 'testimonial1',
            text: 'Testimonial 1',
        },
        {
            id: 'testimonial2',
            text: 'Testimonial 2',
        },
        {
            id: 'testimonial3',
            text: 'Testimonial 3',
        },
        {
            id: 'testimonial4',
            text: 'Testimonial 4',
        },
        {
            id: 'testimonial5',
            text: 'Testimonial 5',
        },
        {
            id: 'testimonial6',
            text: 'Testimonial 6',
        },
        {
            id: 'testimonial7',
            text: 'Testimonial 7',
        },
    ]);

    const slideWidth = 300; // Adjust based on your slide width
    const sliderRef = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            setTestimonials((prevTestimonials) => {
                const shiftedTestimonial = prevTestimonials.shift();
                return [...prevTestimonials, shiftedTestimonial];
            });
        }, 5000); // Adjust time as needed

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col py-10 items-center max-w-[98rem] mx-auto  mt-10">
            <div>
                <h2 className="text-primary text-xl font-bold ">View Testimonials</h2>
                <p className="my-4 text-white text-base">What users are saying about Event Pulse</p>
            </div>

            <div className="overflow-hidden w-full" style={{ height: '200px' }}>
                <AnimatePresence initial={false}>
                    <motion.div
                        className="flex"
                        key={testimonials[0].id}
                        initial={{ x: 0 }}
                        animate={{ x: -(slideWidth * 2) }}
                        transition={{ duration: 0.5, ease: 'linear' }}
                        style={{ width: `${slideWidth * (testimonials.length + 2)}px` }}
                    >
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className="flex-shrink-0 text-white border-[0.5px] border-gray-700 mx-2 rounded-[8px]"
                                style={{
                                    width: `${slideWidth}px`,
                                    height: '100%',
                                    // backgroundColor: '#ccc',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '20px',
                                }}
                            >
                                <img
                                    src={avatar}
                                    className="h-[100px] w-[100px] rounded-full object-cover"
                                    alt=""
                                />
                                <p className="font-bold">Jane Doe</p>
                                <p style={{ textAlign: 'center' }} className="line-clamp-2 text-sm">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                                    ab saepe doloremque, ad voluptates aliquam. Obcaecati laborum
                                    labore dicta maxime.
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Slider;
