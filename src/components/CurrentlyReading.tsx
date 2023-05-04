import { BookEntry } from '../types';
import EntryCurrent from './EntryCurrent';

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
        <section className="currently-reading spacer-y">
            {currentBooks.map((book) =>
            <EntryCurrent key={book.id} {...book}/>)}
        </section>
    )
}

export default CurrentlyReading;