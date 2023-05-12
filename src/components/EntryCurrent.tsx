import { BookEntry } from "../types";
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import React, { useState } from "react";

//for form
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack, TextField } from "@mui/material";

type FunctionalProp = { updateBook: Function }
type EntryCurrentProps = BookEntry & FunctionalProp

const EntryCurrent = 
({id,
  title, 
  authors, 
  pageCount, 
  pagesRead, 
  dateStarted, 
  dateFinished,
  publishedDate,
  publisher,
  userRating,
  status,
  dateAdded,
  updateBook}: EntryCurrentProps) => {
  let progressBarVal = (pagesRead / pageCount) * 100;
  const [isEditing, setEditing] = useState(false);
  
  // for form
  const [listToAdd, setListToAdd] = useState("current");
  const [newPageCount, setNewPageCount] = useState(pageCount);
  const [newPagesRead, setNewPagesRead] = useState(pagesRead);

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    const updatedEntry: BookEntry = {
      //unchanged stuff... there has to be a better way :(
      id: id,
      title: title, 
      authors: authors, 
      publishedDate: publishedDate,
      publisher: publisher,
      dateAdded: dateAdded,
      //possibly updated stuff
      userRating: userRating,
      pageCount: newPageCount, 
      pagesRead: newPagesRead, 
      dateStarted: dateStarted, 
      dateFinished: dateFinished,
      status: listToAdd,
    }
    updateBook(updatedEntry);
  }

  return (
    <>        
        <Box>
          <Typography variant="entryHeader">{title}</Typography>
          <Typography>{authors.join(', ')}</Typography>
        </Box>
        <Divider variant="middle" />
        {dateStarted && <Typography>Started reading {dateStarted}</Typography>}
        <Box sx={{ display: "flex", alignItems: "center"}}>
          <Button size="small" variant="outlined" sx={{ width: "min-content"}}
          onClick={()=>setEditing(!isEditing)}>{isEditing ? 'close' : 'update'}</Button>
          <Box sx={{ width: '100%', ml: 1 }}>
            <Typography variant="body2">{pagesRead} / {pageCount} pages read</Typography>
            <LinearProgress variant="determinate" sx={{ borderRadius: "5px", height: "10px"}} value={progressBarVal} />
          </Box>
        </Box>


        {isEditing &&
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={1}>
          { ['current', 'finished'].includes(listToAdd) &&
          <TextField
              label="Pages Read"
              variant="outlined"
              type="number"
              value={newPagesRead} 
              onChange={(e) => setNewPagesRead(parseInt(e.target.value))}/>}

          <TextField
              label="Page Count"
              variant="outlined"
              type="number"
              value={newPageCount} 
              onChange={(e) => setNewPageCount(parseInt(e.target.value))}
          />
          </Stack>
          <FormControl sx={{width:"75%"}}>
              <InputLabel>Change status</InputLabel>
              <Select
                  labelId="select-list-label"
                  id="select-list"
                  value={listToAdd}
                  label="Select List"
                  onChange={(e:any)=>setListToAdd(e.target.value)}>
                  <MenuItem value="current">Currently reading</MenuItem>
                  <MenuItem value="finished">Finished</MenuItem>
                  <MenuItem value="tbr">To be read</MenuItem>
              </Select>
          </FormControl>
          <Button type="submit">Submit</Button>
        </form>
        }
    </>
  )
}

export default EntryCurrent;
