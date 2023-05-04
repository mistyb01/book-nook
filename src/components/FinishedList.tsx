import { BookEntry } from "../types";
import EntryFinished from "./EntryFinished";

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
        <section className="currently-reading spacer-y">
        {finishedBooks.map((book) => 
            <EntryFinished key={book.id} {...book}/>
        )}
        </section>
    )
}

export default FinishedList;