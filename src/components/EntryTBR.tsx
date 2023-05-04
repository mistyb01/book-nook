import { BookEntry } from "../types";

const EntryTBR = ({title, authors} : BookEntry) => {
  return (
    <section className="tracker-entry">
    <div className="tracker-entry-text">
      <h3>{title}</h3>
      <p>{authors.toString()}</p>
      <p>Date added: April 3</p>
    </div>
  </section>
  )
}

export default EntryTBR;
