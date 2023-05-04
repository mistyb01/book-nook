import { BookEntry } from "../types";

const EntryFinished = ({title, authors, userRating} : BookEntry) => {
  return (
    <section className="tracker-entry">
    <div className="tracker-entry-text">
      <h3>{title}</h3>
      <p>{authors.toString()}</p>
      <p>Finished reading April 3</p>
      <p>Rating: {userRating}</p>
    </div>
  </section>
  )
}

export default EntryFinished;
