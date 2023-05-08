import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SyntheticEvent } from 'react';
import Box from '@mui/material/Box';

type Props = {
    value: number,
    handleChange: (event: SyntheticEvent<Element, Event>, value: any) => void
}
const TrackerHeader = ({value, handleChange}: Props) => {
    // reference: https://mui.com/material-ui/react-tabs/#basic-tabs

    function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }      
  
    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} centered
            TabIndicatorProps={{
                style: {transition: 'none'}
            }}>
                <Tab label="Currently reading" {...a11yProps(0)}/>
                <Tab label="Finished" {...a11yProps(1)}/>
                <Tab label="To be read" {...a11yProps(2)}/>
            </Tabs>
        </Box>
    );
}

export default TrackerHeader;