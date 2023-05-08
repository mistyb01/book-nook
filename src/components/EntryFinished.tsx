import Typography from "@mui/material/Typography";
import { BookEntry } from "../types";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';

const EntryFinished = ({title, authors, userRating, dateFinished} : BookEntry) => {
  return (
    <>
      <Box>
          <Typography variant="entryHeader">{title}</Typography>
          <Typography>{authors.join(', ')}</Typography>
      </Box>
      <Divider variant="middle" />
      {dateFinished && <p>Finished reading {dateFinished}</p>}
      {userRating ? <p>Rating: {userRating}</p> : ''}
    </>
  )
}

export default EntryFinished;
