import Stack from "@mui/material/Stack";
import { Link } from 'react-router-dom';
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
                <Button component={Link} to='/' variant={location === '/' ? 'contained' : 'outlined'}>current</Button>
                <Button component={Link} to='/finished' variant={location === '/finished' ? 'contained' : 'outlined'}>finished</Button>
                <Button component={Link} to='/toread' variant={location === '/toread' ? 'contained' : 'outlined'}>to read</Button>
        </Stack>
    );
}

export default TrackerNav;