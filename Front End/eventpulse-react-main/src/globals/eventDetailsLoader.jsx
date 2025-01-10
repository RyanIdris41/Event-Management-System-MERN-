import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export const  EventHighlightLoader = () => {
  return (
    <div
      className="w-full flex flex-col sm:flex-row events-header  pt-20 imaage">
      <div
        className="w-full sm:w-1/2 text-white gap-8 flex flex-col px-5 sm:px-12 justify-center text-2xl ">
        <Box>
          <Skeleton animation="wave" width={500} height={50} className={'bg-gray-700'}/>
          <Skeleton  width="60%" animation="wave" className={'bg-gray-700'}/>
          <Skeleton width="60%" animation="wave" className={'bg-gray-700'}/>
        </Box>
      </div>
    </div>
  );
}

export const  EventContentLoader = () => {
  return (
    <div
      className="w-full sm:w-[70%] mr-5 flex flex-col gap-5">
      <Box>
        <Skeleton width="20%" animation="wave" className={'bg-gray-700'}/>
        <Skeleton animation="wave" width={700} height={80}
                  className={'bg-gray-700'}/>
        <Skeleton width="20%" animation="wave" className={'bg-gray-700'}/>
        <Skeleton animation="wave" width={700} height={80}
                  className={'bg-gray-700'}/>
        <Skeleton animation="wave" width={700} height={80}
                  className={'bg-gray-700'}/>
        <Skeleton animation="wave" width={700} height={80}
                  className={'bg-gray-700'}/>
        <Skeleton animation="wave" width={700} height={80}
                  className={'bg-gray-700'}/>
      </Box>
    </div>
  )
    ;
}

export const  EventOrganizerLoader = () => {
  return (
    <div
      className="w-full sm:w-[30%] mt-5 sm:mt-0 text-sm flex flex-col gap-4 border-s-2 border-primary p-3">
      <Box>
        <Skeleton width="30%" height={40} animation="wave" className={'bg-gray-700'}/>
        <Skeleton width="35%" height={40} animation="wave" className={'bg-gray-700 mt-2'}/>
        <Skeleton width="30%" height={40} animation="wave" className={'bg-gray-700 mt-2'}/>
        <Skeleton width="40%" height={40} animation="wave" className={'bg-gray-700 mt-2'}/>
      </Box>
    </div>
  )
    ;
}
