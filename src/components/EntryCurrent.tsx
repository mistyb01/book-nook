import { BookEntry } from "../types";
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';

const EntryCurrent = ({title, authors, pageCount, pagesRead, dateStarted}: BookEntry) => {
  let progressBarVal = (pagesRead / pageCount) * 100;

  return (
    <>
      {/* <img src={image} className="tracker-entry-img"/> */}
        
        <Box>
          <Typography variant="entryHeader">{title}</Typography>
          <Typography>{authors.join(', ')}</Typography>
        </Box>
        <Divider variant="middle" />
        {dateStarted && <p>Started reading {dateStarted}</p>}
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" sx={{ borderRadius: "5px", height: "10px"}} value={progressBarVal} />
          </Box>
          <Typography variant="body2">{pagesRead} / {pageCount} pages read</Typography>
        </Box>
        {/* <progress id="pages" max={pageCount} value={pagesRead}></progress> */}
    </>
  )
}

export default EntryCurrent;
