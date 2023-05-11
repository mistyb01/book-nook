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
      {dateFinished && <Typography>Finished reading {dateFinished}</Typography>}
      {userRating ? <Typography>Rating: {userRating}</Typography> : ''}
    </>
  )
}

export default EntryFinished;
