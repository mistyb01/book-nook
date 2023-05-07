import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { MouseEventHandler } from 'react';

const FloatingActionButton = ({handleDisplay}:{handleDisplay: any}) => {
    return (
        <Box sx={{
            position: "fixed",
            bottom: "3rem",
            right: "3rem"
        }}>
            <Fab onClick={handleDisplay} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </Box>
    );
}

export default FloatingActionButton;