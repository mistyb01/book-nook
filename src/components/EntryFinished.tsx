import { BookEntry } from "../types";

const EntryFinished = ({title, authors, userRating, dateFinished} : BookEntry) => {
  return (
    <section className="tracker-entry">
    <div className="tracker-entry-text">
      <h3>{title}</h3>
      <p>{authors.toString()}</p>
      {dateFinished && <p>Finished reading {dateFinished}</p>}
      {userRating > 0 && <p>Rating: {userRating}</p>}
    </div>
  </section>
  )
}

export default EntryFinished;
