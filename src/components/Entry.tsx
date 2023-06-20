import { BookEntry } from "../types";
import LinearProgress from '@mui/material/LinearProgress';
import Box from "@mui/material/Box";
import { Rating, Typography } from "@mui/material";
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import EntryEditor from "./EntryEditor";

import { Stack } from "@mui/material";
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
          
          {props.image ? <img src={props.image}/> : <img src={DefaultCover.src}/>}
          
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
          <EntryEditor
            bookId={props.id}
            handleFormSubmit={(e:any)=>handleSubmit(e)}
            handleFormChange={(e:any)=>handleFormChange(e)}
            handleDelete={(id:string)=>props.deleteBook(id)}
            formInputs={formInputs}
          />
        }
    </>
  )
}

export default Entry;
