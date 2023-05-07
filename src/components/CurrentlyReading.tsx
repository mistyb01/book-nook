import { BookEntry } from '../types';
import EntryCurrent from './EntryCurrent';
import Stack from '@mui/joy/Stack';
import EntryCard from './material-ui/EntryCard';

interface Props {
    userBooks: BookEntry[] | undefined;
}

const CurrentlyReading : React.FC<Props>= ({userBooks}) => {
    if (!userBooks) { 
        return <p>No books yet!</p>
    } 

    const currentBooks = userBooks.filter((book) => book.status === "current");
    if (currentBooks.length === 0) { return <p>No books yet!</p>}

    return (
        <Stack spacing={3}>
            {currentBooks.map((book) =>
            <EntryCard>
                <EntryCurrent key={book.id} {...book}/>
            </EntryCard>)}
        </Stack>
    )
}

export default CurrentlyReading;