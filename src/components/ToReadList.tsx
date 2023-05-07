import { BookEntry } from "../types";
import EntryTBR from "./EntryTBR";
import EntryCard from "./material-ui/EntryCard";
import Stack from '@mui/joy/Stack';

interface Props {
    userBooks: BookEntry[] | undefined;
}

const ToReadList : React.FC<Props> = ({userBooks}) => {
    if (!userBooks) {
        return <p>No books yet!</p>
    }
    const tbrBooks = userBooks.filter((book) => book.status === "tbr");

    if (tbrBooks.length === 0) { return <p>No books yet!</p>}

    return (
        <Stack spacing={3}>
        {tbrBooks.map((book) => 
            <EntryCard>
                <EntryTBR key={book.id} {...book}/>
            </EntryCard>
        )}
        </Stack>
    )
}

export default ToReadList;