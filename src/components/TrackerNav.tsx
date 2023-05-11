import Stack from "@mui/material/Stack";
import { Link } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom'

const TrackerNav = () => {
    const location = useLocation().pathname;

    return (
        <Stack 
            direction='row' 
            spacing={3}  
            justifyContent="center"
            alignItems="center">
            <Link to='/'>
                <Button variant={location === '/' ? 'contained' : 'outlined'}>current</Button>
            </Link>
            <Link to='/finished'>
                <Button variant={location === '/finished' ? 'contained' : 'outlined'}>finished</Button>
            </Link>
            <Link to='/toread'>
                <Button variant={location === '/toread' ? 'contained' : 'outlined'}>to read</Button>
            </Link>
        </Stack>
    );
}

export default TrackerNav;