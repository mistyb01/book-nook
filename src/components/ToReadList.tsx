import { BookEntry } from "../types";
import EntryTBR from "./EntryTBR";

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
        <section className="currently-reading spacer-y">
        {tbrBooks.map((book) => 
            <EntryTBR key={book.id} {...book}/>
        )}
        </section>
    )
}

export default ToReadList;