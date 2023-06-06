import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Stack, TextField } from "@mui/material";

import { Rating, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { BookEntry } from '../types';

// is there a better way?
type Form = {
    status: BookEntry['status'],
    pageCount: BookEntry['pageCount'],
    pagesRead: BookEntry['pagesRead'],
    userRating: BookEntry['userRating'],
    dateStart: BookEntry['dateStarted'],
    dateFinished: BookEntry['dateFinished']
}

type Props = {
    bookId: string,
    handleFormSubmit: React.FormEventHandler,
    handleFormChange: any, //sigh
    handleDelete: Function,
    formInputs: Form
}

const EntryEditor = ({handleFormSubmit, handleFormChange, handleDelete, bookId, formInputs}: Props) => {
    return (
        <form onSubmit={handleFormSubmit}>
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
          <Button onClick={()=>handleDelete(bookId)}>Delete book</Button>
          </Stack>
        </form>
    )
}

export default EntryEditor;