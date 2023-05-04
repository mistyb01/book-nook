import { BookEntry } from "../types";

const EntryTBR = ({title, authors, dateAdded} : BookEntry) => {
  return (
    <section className="tracker-entry">
    <div className="tracker-entry-text">
      <h3>{title}</h3>
      <p>{authors.toString()}</p>
      <p>Date added: {dateAdded}</p>
    </div>
  </section>
  )
}

export default EntryTBR;
