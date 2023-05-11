import { BookEntry } from "../types";
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";

const EntryCurrent = ({title, authors, pageCount, pagesRead, dateStarted}: BookEntry) => {
  let progressBarVal = (pagesRead / pageCount) * 100;

  return (
    <>        
        <Box>
          <Typography variant="entryHeader">{title}</Typography>
          <Typography>{authors.join(', ')}</Typography>
        </Box>
        <Divider variant="middle" />
        {dateStarted && <Typography>Started reading {dateStarted}</Typography>}
        <Box sx={{ display: "flex", alignItems: "center"}}>
          <Button size="small" variant="outlined" sx={{ width: "min-content"}}>update</Button>
          <Box sx={{ width: '100%', ml: 1 }}>
            <Typography variant="body2">{pagesRead} / {pageCount} pages read</Typography>
            <LinearProgress variant="determinate" sx={{ borderRadius: "5px", height: "10px"}} value={progressBarVal} />
          </Box>
        </Box>
    </>
  )
}

export default EntryCurrent;
