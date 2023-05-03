import { Book } from "../types"

const SearchResult = ({id, title, authors, publisher, publishedDate, pageCount }: Book) => {
    return (
        <div className="search-results-entry" key={id}>
            <div>
                <h4>{title}</h4>
                {authors && <p><span className="emphasize">authors</span> {authors[0]}</p>}
                {publisher && <p><span className="emphasize">publisher</span> {publisher}</p>}
                <p><span className="emphasize">year</span> {publishedDate.substring(0,4)}</p>
            </div>
            <button>select</button>
        </div>
    )
}
export default SearchResult;