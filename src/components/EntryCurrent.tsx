import { Typography } from "@mui/material";
import { BookEntry } from "../types";

const EntryCurrent = ({title, authors, pageCount, pagesRead, dateStarted}: BookEntry) => {
  return (
    <>
      {/* <img src={image} className="tracker-entry-img"/> */}
        <Typography variant="entryHeader">{title}</Typography>
        <p>{authors.join(', ')}</p>
        {dateStarted && <p>Started reading {dateStarted}</p>}
        <label htmlFor="pages">Progress:</label>
        <progress id="pages" max={pageCount} value={pagesRead}></progress>
    </>
  )
}

export default EntryCurrent;
