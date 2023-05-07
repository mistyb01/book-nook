import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SyntheticEvent, useState } from 'react';

type Props = {
    value: number,
    handleChange: (event: SyntheticEvent<Element, Event>, value: any) => void
}
const TrackerHeader = ({value, handleChange}: Props) => {


    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }      
  
    return (
    <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Currently reading" {...a11yProps(0)}/>
            <Tab label="Finished" {...a11yProps(1)}/>
            <Tab label="To be read" {...a11yProps(2)}/>
        </Tabs>
    </Box>
    );
}

export default TrackerHeader;