import TheStrangerCover from '../assets/TheStranger.png';
import TravelCatCover from '../assets/TravelCat.png';

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

const ToReadList = () => {
    return (
        <section className="currently-reading spacer-y">
        to read
        </section>
    )
}

export default ToReadList;