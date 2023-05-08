import { Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

interface EntryCardProps {
    children?: React.ReactNode,
  }

const EntryCard = (props: EntryCardProps) => {
    const { children } = props;

    return (
        <>
        <Card variant="outlined">
            <CardContent>
                <Stack spacing={2}>
                {children}
                </Stack>
            </CardContent>
        </Card>
        </>
    );
}

export default EntryCard;