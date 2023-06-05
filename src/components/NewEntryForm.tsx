// form fields depend on the list that's being added to
// pages read: current, finished (but greyed out)
// rating: current, finished
import { Book, BookEntry } from "../types";
import { useState, useEffect, FormEvent } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Button, Stack, TextField } from "@mui/material";

interface NewEntryProps {
    book: Book;
    sendBookData: Function
} 

const NewEntryForm: React.FC<NewEntryProps> = ({book, sendBookData}) => {
    
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let formattedDate = mm + '/' + dd + '/' + today.getFullYear();

    const [formInputs, setFormInputs] = useState({
        listToAdd: "current",
        pageCount: book.pageCount,
        pagesRead: 0,
        rating: 0,
        dateStart: undefined,
        dateFinished: undefined
    })

    useEffect(() => {
        if (formInputs.listToAdd === 'finished') {
            setFormInputs({
                ...formInputs,
                pagesRead: book.pageCount
            })
        } else {
            setFormInputs({
                ...formInputs,
                pagesRead: 0
            })
        }
    }, [formInputs.listToAdd])

    function handleFormChange(e: any) {
        setFormInputs({
            ...formInputs,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newBook : BookEntry = {
            ...book,
            status: formInputs.listToAdd, 
            pagesRead: formInputs.pagesRead,
            userRating: formInputs.rating,
            dateAdded: formattedDate,
            dateStarted: formInputs.dateStart,
            dateFinished: formInputs.dateFinished,
        }
        sendBookData(newBook);
    }

    return (
        <Box>
            <Paper elevation={1} sx={{ padding: "1.5rem" }}>

            <Box sx={{marginBottom: "1rem"}}>
                <Typography variant="overline">New Entry</Typography>
                <Typography variant="h4">{book.title}</Typography>
                <Typography variant="emphasis">{book.authors ? <p>{book.authors.join(', ')}</p> :
                book.publisher ? <p>Published by {book.publisher}</p> : <p>Unknown author</p>}
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                <FormControl sx={{width:"75%"}}>
                    <InputLabel>List to add</InputLabel>
                    <Select
                        name="listToAdd"
                        labelId="select-list-label"
                        id="select-list"
                        value={formInputs.listToAdd}
                        label="Select List"
                        onChange={handleFormChange}>
                        <MenuItem value="current">Currently reading</MenuItem>
                        <MenuItem value="finished">Finished</MenuItem>
                        <MenuItem value="tbr">To be read</MenuItem>
                    </Select>
                </FormControl>

                <Stack direction="row" spacing={1}>
                <TextField
                    name="pageCount"
                    label="Page Count"
                    variant="outlined"
                    type="number"
                    value={formInputs.pageCount} 
                    onChange={handleFormChange}
                />
                
                { ['current', 'finished'].includes(formInputs.listToAdd) &&
                <TextField
                    name="pagesRead"
                    label="Pages Read"
                    variant="outlined"
                    type="number"
                    value={formInputs.pagesRead} 
                    onChange={handleFormChange}/>
                }
                </Stack>

                <Stack direction="row" spacing={1}>
                { ['current', 'finished'].includes(formInputs.listToAdd) &&
                <TextField
                    name="dateStarted"
                    label="Date started"
                    variant="outlined"
                    type="date"
                    value={formInputs.dateFinished} 
                    onChange={handleFormChange}
                    InputLabelProps={{ shrink: true }}
                    />}
                {formInputs.listToAdd === 'finished' && 
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
                {formInputs.listToAdd === 'finished' && 
                    <>
                    <Typography component="legend">Your rating</Typography>
                    <Rating
                    name="rating"
                    value={formInputs.rating}
                    onChange={handleFormChange}
                    />
                    </>
                }
                <Button type="submit" sx={{width: "min-content"}}>submit</Button>
                </Stack>
            </form>
            </Paper>
        </Box>
    )
}

export default NewEntryForm;