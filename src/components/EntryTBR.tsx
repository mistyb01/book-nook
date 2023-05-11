import Typography from "@mui/material/Typography";
import { BookEntry } from "../types";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';

const EntryTBR = ({title, authors, dateAdded} : BookEntry) => {
  return (
    <>
      <Box>
          <Typography variant="entryHeader">{title}</Typography>
          <Typography>{authors.join(', ')}</Typography>
      </Box>
      <Divider variant="middle" />
      <Typography>Date added: {dateAdded}</Typography>
  </>
  )
}

export default EntryTBR;
