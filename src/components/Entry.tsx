import { BookEntry } from "../types";
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";
import { Rating, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";

//for form
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack, TextField } from "@mui/material";

type ExtraProps = { 
  updateBook: Function,
  deleteBook: Function,
  entryType: string
}

type EntryCurrentProps = BookEntry & ExtraProps

const Entry= (props: EntryCurrentProps) => {
  let progressBarVal = (props.pagesRead / props.pageCount) * 100;
  const [isEditing, setEditing] = useState(false);
  
  // for form
  const [listToAdd, setListToAdd] = useState(props.status);
  const [newPageCount, setNewPageCount] = useState(props.pageCount);
  const [newPagesRead, setNewPagesRead] = useState(props.pagesRead);
  const [newUserRating, setNewUserRating] = useState(props.userRating);
  const [newDateStart, setNewDateStart] = useState(props.dateStarted);
  const [newDateFinished, setNewDateFinished] = useState(props.dateFinished);

  useEffect(() => {
    if (listToAdd === 'finished') {
        setNewPagesRead(newPageCount)
    } 
  }, [listToAdd])

  function handleSubmit(e:React.FormEvent) {
    setEditing(false);
    e.preventDefault();
    const updatedEntry: BookEntry = {
      // contains the unchanged info
      ...props, 
      // and the possibly updated stuff
      userRating: newUserRating,
      pageCount: newPageCount, 
      pagesRead: newPagesRead, 
      dateStarted: newDateStart, 
      dateFinished: newDateFinished,
      status: listToAdd,
    }
    props.updateBook(updatedEntry);
  }

  
 
  function CurrentEntry() {
      return (
        <>
      <Box sx={{ display: "flex", alignItems: "center"}}>
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
        {props.dateFinished && <Typography>Finished {props.dateFinished}</Typography>}
        </>
      )
    }

    function TbrEntry() {
      return (
        <Typography variant='body2'>Date added: {props.dateAdded}</Typography>
      )
    }

  return (
    <>       
        <Stack direction="row" spacing={2}>
          <img src={props.image}/>
          <Stack spacing={2} sx={{width: "100%"}}>
            <Box>
              <Typography variant="entryHeader">{props.title}</Typography>
              <Typography>{props.authors.join(', ')}</Typography>
              <Divider variant="middle" />
            </Box>
            {props.dateStarted && <Typography>Started {props.dateStarted}</Typography>} 
            {props.entryType === 'current' ? <CurrentEntry/> :
            props.entryType === 'finished' ? <FinishedEntry/> : 
            <TbrEntry/>}
            {props.userRating ? <Typography>Rating: {'★'.repeat(props.userRating)}{'☆'.repeat(5-props.userRating)}</Typography> : ''}
            <Button size="small" variant="outlined" sx={{ 
              width: "min-content",
              height: "min-content"
            }}
            onClick={()=>setEditing(!isEditing)}>{isEditing ? 'close' : 'edit'}</Button>
          </Stack>
        </Stack>

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

          <Stack direction="row" spacing={1}>
            { ['current', 'finished'].includes(listToAdd) &&
            <TextField
                label="Date started"
                variant="outlined"
                type="date"
                value={newDateStart} 
                onChange={(e) => setNewDateStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
                />}
            {listToAdd === 'finished' && 
                <TextField
                label="Date finished"
                variant="outlined"
                type="date"
                value={newDateFinished} 
                onChange={(e) => setNewDateFinished(e.target.value)}
                InputLabelProps={{ shrink: true }}
                />}
        </Stack>

          <Typography component="legend">Your rating</Typography>
          <Rating
          name="simple-controlled"
          value={newUserRating}
          onChange={(e, newValue) => setNewUserRating(newValue)}
          />
          
          <Button type="submit">Submit</Button>
          <Button onClick={()=>props.deleteBook(props.id)}>Delete book</Button>
          </Stack>
        </form>
        }
    </>
  )
}

export default Entry;
