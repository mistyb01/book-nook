type EntryProps = {
  title: string,
  author: string,
  pageCount: number,
  pagesRead: number
  // image: string,
  // date start
}

const CurrentlyReadingEntry = ({title, author, pageCount, pagesRead}: EntryProps) => {
  return (
    <section className="tracker-entry">
      {/* <img src={image} className="tracker-entry-img"/> */}
      <div className="tracker-entry-text">
        <h3>{title}</h3>
        <p>{author}</p>
        <p>Started reading April 3</p>
        <label htmlFor="pages">Progress:</label>
        <progress id="pages" max={pageCount} value={pagesRead}></progress>
      </div>
    </section>
  )
}

export default CurrentlyReadingEntry;
