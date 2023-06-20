import { Stack, Typography } from '@mui/material';
import LogoImg from '../assets/logo.png';

const Logo = () => {
    return (
        <Stack>
        {/* <img src={LogoImg} style={{objectFit: 'contain', height: "2.5rem", margin: "1rem 0 -1rem 0"}}/> */}
        <Typography variant="logo">book nook</Typography>
        </Stack>
    )
}

export default Logo;