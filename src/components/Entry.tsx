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

type ExtraProps = { 
  updateBook: Function,
  entryType: string
}

type EntryCurrentProps = BookEntry & ExtraProps

const Entry= (props: EntryCurrentProps) => {
  let progressBarVal = (props.pagesRead / props.pageCount) * 100;
  const [isEditing, setEditing] = useState(false);
  
  // for form
  const [listToAdd, setListToAdd] = useState("current");
  const [newPageCount, setNewPageCount] = useState(props.pageCount);
  const [newPagesRead, setNewPagesRead] = useState(props.pagesRead);

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    const updatedEntry: BookEntry = {
      // contains the unchanged info
      ...props, 
      // and the possibly updated stuff
      userRating: props.userRating,
      pageCount: newPageCount, 
      pagesRead: newPagesRead, 
      dateStarted: props.dateStarted, 
      dateFinished: props.dateFinished,
      status: listToAdd,
    }
    props.updateBook(updatedEntry);
  }
 
  function CurrentEntry() {
      return (
        <>
      <Box sx={{ display: "flex", alignItems: "center"}}>
        <Button size="small" variant="outlined" sx={{ width: "min-content"}}
        onClick={()=>setEditing(!isEditing)}>{isEditing ? 'close' : 'update'}</Button>
        <Box sx={{ width: '100%', ml: 1 }}>
          <Typography variant="body2">{props.pagesRead} / {props.pageCount} pages read</Typography>
          <LinearProgress variant="determinate" sx={{ borderRadius: "5px", height: "10px"}} value={progressBarVal} />
        </Box>
      </Box>
      </>
      )
    }

    function FinishedEntry() {
      return (
        <>
        {props.dateFinished && <Typography>Finished reading {props.dateFinished}</Typography>}
        {props.userRating ? <Typography>Rating: {props.userRating}</Typography> : ''}
        </>
      )
    }

    function TbrEntry() {
      return (
        <Typography>Date added: {props.dateAdded}</Typography>
      )
    }

  return (
    <>       
      <Box>
        <Typography variant="entryHeader">{props.title}</Typography>
        <Typography>{props.authors.join(', ')}</Typography>
      </Box>
      <Divider variant="middle" />
      {props.dateStarted && <Typography>Started reading {props.dateStarted}</Typography>} 

      {props.entryType === 'current' ? <CurrentEntry/> :
      props.entryType === 'finished' ? <FinishedEntry/> : <TbrEntry/>}

        {isEditing &&
        <form onSubmit={handleSubmit}>
          <Stack spacing={1} alignItems="flex-start">
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
          </Stack>
        </form>
        }
    </>
  )
}

export default Entry;
