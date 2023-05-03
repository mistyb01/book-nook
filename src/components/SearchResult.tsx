import { Book } from "../types"
 

type Props = Book & {handleSetSelectedBook: Function}

const SearchResult = ({id, title, authors, publisher, publishedDate, pageCount, handleSetSelectedBook }: Props) => {
    const book = {id,title,authors,publisher,publishedDate,pageCount} // can i shorten this 
    return (
        <div className="search-results-entry" key={id}>
            <div>
                <h4>{title}</h4>
                {authors && <p><span className="emphasize">authors</span> {authors[0]}</p>}
                {publisher && <p><span className="emphasize">publisher</span> {publisher}</p>}
                {publishedDate && <p><span className="emphasize">year</span> {publishedDate.substring(0,4)}</p>}
            </div>
            <button onClick={()=>handleSetSelectedBook(book)}>select</button>
        </div>
    )
}
export default SearchResult;