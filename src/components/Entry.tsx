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

type Props = { 
  entryData: BookEntry,
  updateBook: Function,
  deleteBook: Function,
  entryType: string
}

const Entry= ({entryData, updateBook, deleteBook, entryType}: Props) => {
  let progressBarVal = (entryData.pagesRead / entryData.pageCount) * 100;
  const [isEditing, setEditing] = useState(false);

  const [formInputs, setFormInputs] = useState({
    status: entryData.status,
    pageCount: entryData.pageCount,
    pagesRead: entryData.pagesRead,
    userRating: entryData.userRating,
    dateStart: entryData.dateStarted,
    dateFinished: entryData.dateFinished
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
      ...entryData, 
      // and the possibly updated stuff
      ...formInputs
    }
    updateBook(updatedEntry);
  }

  
 
  function CurrentEntry() {
      return (
        <>
      <Box sx={{ display: "flex", alignItems: "center"}}>
        <Box sx={{ width: '100%', ml: 1 }}>
          <Typography variant="body2">{entryData.pagesRead} / {entryData.pageCount} pages read</Typography>
          <LinearProgress variant="determinate" sx={{ borderRadius: "5px", height: "10px"}} value={progressBarVal} />
        </Box>
      </Box>
      </>
      )
    }

    function FinishedEntry() {
      return (
        <>
        {entryData.dateFinished && <Typography>Finished {entryData.dateFinished}</Typography>}
        </>
      )
    }

    function TbrEntry() {
      return (
        <Typography variant='body2'>Date added: {entryData.dateAdded}</Typography>
      )
    }

  return (
    <>       
        <Stack direction="row" spacing={2}>
          
          {entryData.image ? <img src={entryData.image}/> : <img src={DefaultCover}/>}
          
          <Stack spacing={2} sx={{width: "100%"}}>
            <Box>
              <Typography variant="entryHeader">{entryData.title}</Typography>
              <Typography>{entryData.authors.join(', ')}</Typography>
              <Divider variant="middle" />
            </Box>
            {entryData.dateStarted && <Typography>Started {entryData.dateStarted}</Typography>} 
            {entryType === 'current' ? <CurrentEntry/> :
            entryType === 'finished' ? <FinishedEntry/> : 
            <TbrEntry/>}
            {entryData.userRating ? <Typography>Rating: {'★'.repeat(entryData.userRating)}{'☆'.repeat(5-entryData.userRating)}</Typography> : ''}
            <Button size="small" variant="outlined" sx={{ 
              width: "min-content",
              height: "min-content"
            }}
            onClick={()=>setEditing(!isEditing)}>{isEditing ? 'close' : 'edit'}</Button>
          </Stack>
        </Stack>

        {isEditing &&
          <EntryEditor
            bookId={entryData.id}
            handleFormSubmit={(e:any)=>handleSubmit(e)}
            handleFormChange={(e:any)=>handleFormChange(e)}
            handleDelete={(id:string)=>deleteBook(id)}
            formInputs={formInputs}
          />
        }
    </>
  )
}

export default Entry;
