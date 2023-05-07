import { BookEntry } from '../types';
import EntryCurrent from './EntryCurrent';
import Stack from '@mui/joy/Stack';

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
        <Stack spacing={5}>
            {currentBooks.map((book) =>
            <EntryCurrent key={book.id} {...book}/>)}
        </Stack>
    )
}

export default CurrentlyReading;