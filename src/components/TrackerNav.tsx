import Stack from "@mui/material/Stack";
import { Link } from 'react-router-dom';

const TrackerNav = () => {

    return (
        <Stack direction='row' spacing={3}>
            <Link to='/'>current</Link>
            <Link to='/finished'>finished</Link>
            <Link to='/toread'>to read</Link>
        </Stack>
    );
}

export default TrackerNav;