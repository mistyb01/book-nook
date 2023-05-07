import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState } from 'react';

type Props = {
    display: string,
    handleSetDisplay: Function
}
const TrackerHeader = () => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
    //     <ul className="tracker-tabs">
    //     <li onClick={()=>handleSetDisplay('current')} className={`${ display === 'current' ? 'active-tab' : ''}`}>currently reading</li>
    //     <li onClick={()=>handleSetDisplay('finished')} className={`${ display === 'finished' ? 'active-tab' : ''}`}>finished</li>
    //     <li onClick={()=>handleSetDisplay('tbr')} className={`${ display === 'tbr' ? 'active-tab' : ''}`}>want to read</li>
    //     <button onClick={()=>handleSetDisplay('add')}>add new entry</button>
    // </ul>
    <Box sx={{ width: '100%' }}>
        <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Currently reading" />
            <Tab label="Finished" />
            <Tab label="To be read" />
        </Tabs>
    </Box>
    );
}

export default TrackerHeader;