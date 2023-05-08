import Typography from "@mui/material/Typography";
import { BookEntry } from "../types";

const EntryFinished = ({title, authors, userRating, dateFinished} : BookEntry) => {
  return (
    <>
      <Typography variant="entryHeader">{title}</Typography>
      <p>{authors.join(', ')}</p>
      {dateFinished && <p>Finished reading {dateFinished}</p>}
      {userRating ? <p>Rating: {userRating}</p> : ''}
    </>
  )
}

export default EntryFinished;
