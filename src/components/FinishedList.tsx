import { BookEntry } from "../types";
import EntryFinished from "./EntryFinished";
import Stack from '@mui/joy/Stack';
import EntryCard from "./material-ui/EntryCard";

interface Props {
    userBooks: BookEntry[] | undefined;
}

const FinishedList : React.FC<Props> = ({userBooks}) => {
    if (!userBooks) {
        return <p>No books yet!</p>
    }
    const finishedBooks = userBooks.filter((book) => book.status === "finished");

    if (finishedBooks.length === 0) { return <p>No books yet!</p>}

    return (
        <Stack spacing={3}>
        {finishedBooks.map((book) => 
            <EntryCard>
                <EntryFinished key={book.id} {...book}/>
            </EntryCard>
        )}
        </Stack>
    )
}

export default FinishedList;