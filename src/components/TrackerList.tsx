import { BookEntry } from "../types";
import EntryCurrent from "./EntryCurrent";
import EntryFinished from "./EntryFinished";
import EntryTBR from "./EntryTBR";
import EntryCard from "./material-ui/EntryCard";
import Stack from '@mui/joy/Stack';

interface Props {
    userBooks: BookEntry[] | undefined;
    listType: "current" | "finished" | "tbr"
}

const TrackerList : React.FC<Props> = ({userBooks, listType}) => {
    if (!userBooks) {
        return <p>No books yet!</p>
    }
    const filteredBooks = userBooks.filter((book) => book.status === listType);

    if (filteredBooks.length === 0) { return <p>No books yet!</p>}

    return (
        <Stack spacing={3}>
        {filteredBooks.map((book) => 
            <EntryCard>
                {listType === "current" ? 
                <EntryCurrent key={book.id} {...book}/> :
                listType === "finished" ? 
                <EntryFinished key={book.id} {...book}/> :
                <EntryTBR key={book.id} {...book}/>}
            </EntryCard>
        )}
        </Stack>
    )
}

export default TrackerList;