type EntryProps = {
  title: string,
  author: string,
  // rating
  // date start and end
  // page count probs
}

const FinishedEntry = ({title, author} : EntryProps) => {
  return (
    <section className="tracker-entry">
    {/* <img src={image} className="tracker-entry-img"/> */}
    <div className="tracker-entry-text">
      <h3>{title}</h3>
      <p>{author}</p>
      <p>Finished reading April 3</p>
      <p>Rating: 5 stars</p>
    </div>
  </section>
  )
}

export default FinishedEntry;
