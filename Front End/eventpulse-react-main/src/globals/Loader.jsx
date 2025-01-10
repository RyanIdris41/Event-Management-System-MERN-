import React from 'react';

const Loader = () => {
    return (
        <div className="h-full flex items-center  justify-center  z-[10]">
            <div className=" rounded animate-spin border-primary border-2  h-[50px] w-[50px]">
                Loader
            </div>
        </div>
    );
};

export default Loader;
