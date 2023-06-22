import Stack from "@mui/material/Stack";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useLocation } from 'react-router-dom'

const TrackerNav = () => {
    const location = useLocation().pathname;

    return (
        <Stack direction={{xs: "column", sm: "row"}} 
            justifyContent="space-between"
            alignItems={{xs: "center", sm: "auto"}}>
        <ButtonGroup size="large" disableElevation>
                <Button component={Link} to='/' variant={location === '/' ? 'contained' : 'outlined'}>current</Button>
                <Button component={Link} to='/finished' variant={location === '/finished' ? 'contained' : 'outlined'}>finished</Button>
                <Button component={Link} to='/toread' variant={location === '/toread' ? 'contained' : 'outlined'}>to read</Button>
        </ButtonGroup>
        <Button component={Link} to='/new' variant={location === '/new' ? 'contained' : 'text'}>+ add book</Button>
        </Stack>
    );
}

export default TrackerNav;