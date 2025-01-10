import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function EventLoader({count}) {
  const elements = Array.from({ length: count }, (_, index) => index);
  return (
    <>
      {
        elements.map((element) => (
          <Box sx={{mx: 3}} key={element}>
            <Skeleton animation="wave" width={300} height={280} className={'bg-gray-700'}/>
            <Skeleton  animation="wave" width={300} height={100} className={'bg-gray-700'}/>
            <Skeleton width="60%" animation="wave" className={'bg-gray-700 mt-2'}/>
          </Box>))
      }
    </>
  );
}
