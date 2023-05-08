import Typography from "@mui/material/Typography";
import { BookEntry } from "../types";

const EntryTBR = ({title, authors, dateAdded} : BookEntry) => {
  return (
    <>
      <Typography variant="entryHeader">{title}</Typography>
      <p>{authors.join(', ')}</p>
      <p>Date added: {dateAdded}</p>
  </>
  )
}

export default EntryTBR;
