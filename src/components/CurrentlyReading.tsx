import { BookEntry } from '../types';
import CurrentlyReadingEntry from './CurrentlyReadingEntry';

interface Props {
    userBooks: BookEntry[] | undefined;
}

const CurrentlyReading : React.FC<Props>= ({userBooks}) => {
    if (!userBooks) { 
        return <p>no books yet!</p>
    } 

    const currentBooks = userBooks.filter((book) => book.status === "current");
    return (
        <section className="currently-reading spacer-y">
            {currentBooks.map((book) =>
            <CurrentlyReadingEntry key={book.id} {...book}/>)}
        </section>
    )
}

export default CurrentlyReading;