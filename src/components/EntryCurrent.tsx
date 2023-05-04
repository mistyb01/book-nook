import { BookEntry } from "../types";

const EntryCurrent = ({title, authors, pageCount, pagesRead, dateStarted}: BookEntry) => {
  return (
    <section className="tracker-entry">
      {/* <img src={image} className="tracker-entry-img"/> */}
      <div className="tracker-entry-text">
        <h3>{title}</h3>
        <p>{authors.toString()}</p>
        {dateStarted && <p>Started reading {dateStarted}</p>}
        <label htmlFor="pages">Progress:</label>
        <progress id="pages" max={pageCount} value={pagesRead}></progress>
      </div>
    </section>
  )
}

export default EntryCurrent;
