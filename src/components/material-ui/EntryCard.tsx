import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface EntryCardProps {
    children?: React.ReactNode;
  }

const EntryCard = (props: EntryCardProps) => {
    const { children } = props;

    return (
        <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    );
}

export default EntryCard;