// form fields depend on the list that's being added to
// pages read: current, finished (but greyed out)
// rating: current, finished
import { Book } from "../types";

interface NewEntryProps {
    book: Book;
} 

const NewEntryForm: React.FC<NewEntryProps> = ({book}) => {
    return (
        <section className="new-entry-form">
            <h2>New Entry</h2>
            <h3>{book.title}</h3>
            {book.authors ? <p>Author: {book.authors.toString()}</p> :
            book.publisher ? <p>Publisher: {book.publisher}</p> : <p>Unknown author</p>}
            <form>
                <div className="spacer-x">
                    <label htmlFor="pageCount">page count</label>
                    <input type="number" name="pageCount" value={book.pageCount}></input>
                </div>
                <div className="spacer-x">
                    <label htmlFor="list">Add to</label>
                    <select name="list" id="list">
                    <option value="current">Currently reading</option>
                    <option value="finished">Finished</option>
                    <option value="tbr">To be read</option>
                    </select> 
                </div>
                <button type="submit">submit</button>
            </form>
        </section>
    )
}

export default NewEntryForm;