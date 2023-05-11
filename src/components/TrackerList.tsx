import { Box, Typography } from "@mui/material";
import { BookEntry } from "../types";
import EntryCurrent from "./EntryCurrent";
import EntryFinished from "./EntryFinished";
import EntryTBR from "./EntryTBR";
import EntryCard from "./material-ui/EntryCard";
import Stack from '@mui/joy/Stack';

interface Props {
    userBooks: BookEntry[] | undefined;
    listType: "current" | "finished" | "tbr"
}

const EmptyListMessage = ({listType}:{listType:string}) => {
    if (listType === "tbr") listType = "to be read";
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: "3rem", textAlign: "center"}}>
            <Typography variant="h5">Nothing here yet!</Typography>
            <Typography variant="body2">
                {listType === "current" ? <>Books you are <strong>currently reading</strong></>
                : listType === "finished" ? <>Books you have <strong>finished</strong></>
                : <>Books you <strong>plan to read</strong></>} will appear in this tab.
            </Typography>
        </Box>
    )
}

const TrackerList : React.FC<Props> = ({userBooks, listType}) => {
    if (!userBooks) { return (<EmptyListMessage listType={listType}/>) }

    const filteredBooks = userBooks.filter((book) => book.status === listType);

    if (filteredBooks.length === 0) { 
        return (<EmptyListMessage listType={listType}/>) }

    return (
        <Stack spacing={3}>
        {filteredBooks.map((book) => 
            <EntryCard key={book.id}>
                {listType === "current" ? 
                <EntryCurrent key={book.id} {...book}/> :
                listType === "finished" ? 
                <EntryFinished key={book.id} {...book}/> :
                <EntryTBR key={book.id} {...book}/>}
            </EntryCard>
        )}
        </Stack>
    )
}

export default TrackerList;