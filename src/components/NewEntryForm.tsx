// form fields depend on the list that's being added to
// pages read: current, finished (but greyed out)
// rating: current, finished
import { Book, BookEntry } from "../types";
import { useState, useEffect, FormEventHandler, FormEvent } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
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

    const [listToAdd, setListToAdd] = useState("current");
    const [pageCount, setPageCount] = useState(book.pageCount);
    const [pagesRead, setPagesRead] = useState(0);
    const [rating, setRating] = useState<number | null>(0);
    const [dateStart, setDateStart] = useState<string | undefined>(undefined);
    const [dateFinished, setDateFinished] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (listToAdd === 'finished') {
            setPagesRead(pageCount)
        } else setPagesRead(0)
    }, [listToAdd])


    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newBook : BookEntry = {
            ...book,
            status: listToAdd, 
            pagesRead: pagesRead,
            userRating: rating,
            dateAdded: formattedDate,
            dateStarted: dateStart,
            dateFinished: dateFinished,
        }
        console.log("new:",newBook);
        sendBookData(newBook);
    }

    return (
        <Box>
            <Box sx={{marginBottom: "1rem"}}>
                <Typography variant="overline">New Entry</Typography>
                <Typography variant="h4">{book.title}</Typography>
                <Typography variant="emphasis">{book.authors ? <p>{book.authors.toString()}</p> :
                book.publisher ? <p>Published by {book.publisher}</p> : <p>Unknown author</p>}
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                <FormControl sx={{width:"75%"}}>
                    <InputLabel>List to add</InputLabel>
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
                <TextField
                    label="Page Count"
                    variant="outlined"
                    type="number"
                    value={pageCount} 
                    onChange={(e) => setPageCount(parseInt(e.target.value))}
                />
                
                { ['current', 'finished'].includes(listToAdd) &&
                <TextField
                    label="Pages Read"
                    variant="outlined"
                    type="number"
                    value={pagesRead} 
                    onChange={(e) => setPagesRead(parseInt(e.target.value))}/>
                }
                </Stack>

                <Stack direction="row" spacing={1}>
                { ['current', 'finished'].includes(listToAdd) &&
                <TextField
                    label="Date started"
                    variant="outlined"
                    type="date"
                    value={dateFinished} 
                    onChange={(e) => setDateStart(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    />}
                {listToAdd === 'finished' && 
                    <TextField
                    label="Date finished"
                    variant="outlined"
                    type="date"
                    value={dateFinished} 
                    onChange={(e) => setDateFinished(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    />}
                </Stack>
                {listToAdd === 'finished' && 
                    <>
                    <Typography component="legend">Your rating</Typography>
                    <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e, newValue) => setRating(newValue)}
                    />
                    </>
                }
                <Button type="submit" sx={{width: "min-content"}}>submit</Button>
                </Stack>
            </form>
        </Box>
    )
}

export default NewEntryForm;