import TheStrangerCover from '../assets/TheStranger.png';
import TravelCatCover from '../assets/TravelCat.png';
import CurrentlyReadingEntry from './CurrentlyReadingEntry';

// note: data taken in by CurrentlyReadingEntry should be type BookEntry
const MOCKDATA = [
    {
        id: "1",
        title: 'The Stranger',
        authors: 'Albert Camus',
        image: TheStrangerCover,
        pageCount: 122,
        pagesRead: 50
    },
    {
        id: "2",
        title: 'The Traveling Cat Chronicles',
        authors: 'Hiro Arikawa',
        image: TravelCatCover,
        pageCount: 275,
        pagesRead: 200
    },
]

const CurrentlyReading = () => {
    return (
        <section className="currently-reading spacer-y">
            {MOCKDATA.map((book) =>
            <CurrentlyReadingEntry 
            key={book.id}
            title={book.title} 
            author={book.authors}
            image={book.image}
            pageCount={book.pageCount}
            pagesRead={book.pagesRead}
            />)}
        </section>
    )
}

export default CurrentlyReading;