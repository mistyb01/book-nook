import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { MouseEventHandler } from 'react';
import Box from '@mui/material/Box';

const FloatingActionButton = () => {
    return (
        <Box sx={{
            position: "fixed",
            bottom: "3rem",
            right: "3rem"
        }}>
            <Fab color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Box>
    );
}

export default FloatingActionButton;