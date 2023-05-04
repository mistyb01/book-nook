// form fields depend on the list that's being added to
// pages read: current, finished (but greyed out)
// rating: current, finished
import { Book, BookEntry } from "../types";
import { useState, useEffect, FormEventHandler, FormEvent } from "react";

interface NewEntryProps {
    book: Book;
    sendBookData: Function
} 

const NewEntryForm: React.FC<NewEntryProps> = ({book, sendBookData}) => {
    
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let formattedDate = mm + '/' + dd + '/' + today.getFullYear();

    const [listToAdd, setListToAdd] = useState("current");
    const [pageCount, setPageCount] = useState(book.pageCount);
    const [pagesRead, setPagesRead] = useState(0);
    const [rating, setRating] = useState(0);
    const [dateStart, setDateStart] = useState<string | undefined>(undefined);
    const [dateFinished, setDateFinished] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (listToAdd === 'finished') {
            setPagesRead(pageCount)
        } else setPagesRead(0)
    }, [listToAdd])


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newBook : BookEntry = {
            ...book,
            status: listToAdd, 
            pagesRead: pagesRead,
            userRating: rating,
            dateAdded: formattedDate,
            dateStarted: dateStart,
            dateFinished: dateFinished,
        }
        console.log("new:",newBook);
        sendBookData(newBook);
    }

    return (
        <section className="new-entry-form">
            <h2>New Entry</h2>
            <h3>{book.title}</h3>
            {book.authors ? <p>Author: {book.authors.toString()}</p> :
            book.publisher ? <p>Publisher: {book.publisher}</p> : <p>Unknown author</p>}
            <form onSubmit={handleSubmit}>
                <div className="spacer-x">
                    <label htmlFor="list">Add to</label>
                    <select name="list" id="list" onChange={(e)=>setListToAdd(e.target.value)}>
                    <option value="current">Currently reading</option>
                    <option value="finished">Finished</option>
                    <option value="tbr">To be read</option>
                    </select> 
                </div>
                <div className="spacer-x">
                    <label htmlFor="pageCount">page count</label>
                    <input type="number" name="pageCount" value={pageCount} 
                    onChange={(e) => setPageCount(parseInt(e.target.value))}></input>
                </div>
                { ['current', 'finished'].includes(listToAdd) &&
                <>
                <div className="spacer-x">
                    <label htmlFor="pagesRead">pages read</label>
                    <input type="number" name="pagesRead" value={pagesRead}
                    onChange={(e) => setPagesRead(parseInt(e.target.value))}></input>
                </div>
                <div className="spacer-x">
                    <label htmlFor="rating">your rating</label>
                    <input type="number" name="rating" min="0" max="5" value={rating}
                    onChange={(e) => setRating(parseInt(e.target.value))}></input>
                </div>
                <div className="spacer-x">
                    <label htmlFor="date-start">date started</label>
                    <input type="date" id="start" name="date-start"
                    value={dateStart || formattedDate}
                    onChange={(e) => setDateStart(e.target.value)}></input>
                </div>
                </>
                }
                {listToAdd === 'finished' && 
                <div className="spacer-x">
                    <label htmlFor="date-fin">date finished</label>
                    <input type="date" id="start" name="date-fin"
                    value={dateFinished}
                    onChange={(e) => setDateFinished(e.target.value)}></input>
                </div>
                }

                <button type="submit">submit</button>
            </form>
        </section>
    )
}

export default NewEntryForm;