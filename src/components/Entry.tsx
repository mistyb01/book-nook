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
import DefaultCover from '../assets/defaultcover.png';

type ExtraProps = { 
  updateBook: Function,
  deleteBook: Function,
  entryType: string
}

type EntryCurrentProps = BookEntry & ExtraProps

const Entry= (props: EntryCurrentProps) => {
  let progressBarVal = (props.pagesRead / props.pageCount) * 100;
  const [isEditing, setEditing] = useState(false);

  const [formInputs, setFormInputs] = useState({
    status: props.status,
    pageCount: props.pageCount,
    pagesRead: props.pagesRead,
    userRating: props.userRating,
    dateStart: props.dateStarted,
    dateFinished: props.dateFinished
  })
  
  function handleFormChange(e: any) {
    setFormInputs({
        ...formInputs,
        [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (formInputs.status === 'finished') {
        // setNewPagesRead(newPageCount)
        setFormInputs({
          ...formInputs,
          pagesRead: formInputs.pageCount
      })
    } 
  }, [formInputs.status])

  function handleSubmit(e:React.FormEvent) {
    setEditing(false);
    e.preventDefault();
    const updatedEntry: BookEntry = {
      // contains the unchanged info
      ...props, 
      // and the possibly updated stuff
      ...formInputs
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
          
          {props.image ? <img src={props.image}/> : <img src={DefaultCover}/>}
          
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
          { ['current', 'finished'].includes(formInputs.status) &&
          <TextField
              name="pagesRead"
              label="Pages Read"
              variant="outlined"
              type="number"
              value={formInputs.pagesRead} 
              onChange={handleFormChange}/>}

          <TextField
              name="pageCount"
              label="Page Count"
              variant="outlined"
              type="number"
              value={formInputs.pageCount} 
              onChange={handleFormChange}
          />
          </Stack>
          
          <FormControl sx={{width:"75%"}}>
              <InputLabel>Change status</InputLabel>
              <Select
                  name="status"
                  labelId="select-list-label"
                  id="select-list"
                  value={formInputs.status}
                  label="Select List"
                  onChange={handleFormChange}>
                  <MenuItem value="current">Currently reading</MenuItem>
                  <MenuItem value="finished">Finished</MenuItem>
                  <MenuItem value="tbr">To be read</MenuItem>
              </Select>
          </FormControl>

          <Stack direction="row" spacing={1}>
            { ['current', 'finished'].includes(formInputs.status) &&
            <TextField
                name="dateStart"
                label="Date started"
                variant="outlined"
                type="date"
                value={formInputs.dateStart} 
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
                />}
            {formInputs.status === 'finished' && 
                <TextField
                name="dateFinished"
                label="Date finished"
                variant="outlined"
                type="date"
                value={formInputs.dateFinished} 
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
                />}
        </Stack>

          <Typography component="legend">Your rating</Typography>
          <Rating
          name="userRating"
          value={formInputs.userRating}
          onChange={handleFormChange}
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
