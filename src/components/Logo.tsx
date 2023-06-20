import { Stack, Typography } from '@mui/material';
import LogoImg from '../assets/logo.png';

const Logo = () => {
    return (
        <Stack direction="row" gap="1rem">
        {/* <img src={LogoImg} alt="decorative logo" 
        style={{objectFit: 'contain', height: "3.5rem", width: "3.5rem",
        border: "2px solid pink", borderRadius: "50%"}}/> */}
        <Typography variant="logo">book nook</Typography>
        </Stack>
    )
}

export default Logo;