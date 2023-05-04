import { BookEntry } from "../types";

const CurrentlyReadingEntry = ({title, authors, pageCount, pagesRead}: BookEntry) => {
  return (
    <section className="tracker-entry">
      {/* <img src={image} className="tracker-entry-img"/> */}
      <div className="tracker-entry-text">
        <h3>{title}</h3>
        <p>{authors.toString()}</p>
        <p>Started reading April 3</p>
        <label htmlFor="pages">Progress:</label>
        <progress id="pages" max={pageCount} value={pagesRead}></progress>
      </div>
    </section>
  )
}

export default CurrentlyReadingEntry;
