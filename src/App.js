
import React from 'react';
import { Box, Stack } from '@mui/material';
import SideBar from './components/SideBar';
import Sales from './components/Sales';


export default function App() {

  return (
    <>
    <SideBar/>

    <Sales/>

    <Stack 
      bgcolor={'blue'} 
      height={'100vh'}
    >

      <Box 
        bgcolor={(theme) => theme.palette.primary.main}
        height={'40%'}
      ></Box>

      <Box bgcolor={'white'} height={'60%'}></Box>
    </Stack>
    </>
  );
}