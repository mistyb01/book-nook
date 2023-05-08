import { Book } from "../types"
import { Card, Button, CardContent, CardHeader, Typography, CardActions } from '@mui/material';
 

type Props = Book & {handleSetSelectedBook: Function}

const SearchResult = ({id, title, authors, publisher, publishedDate, pageCount, handleSetSelectedBook }: Props) => {
    const book = {id,title,authors,publisher,publishedDate,pageCount} // can i shorten this 
    return (
        <Card variant="outlined" key={id}>
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="body1">
                {authors && <p>authors: {authors[0]}</p>}
                {publisher && <p>publisher: {publisher}</p>}
                {publishedDate && <p>year: {publishedDate.substring(0,4)}</p>}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={()=>handleSetSelectedBook(book)}>select</Button>
            </CardActions>
        </Card>
    )
}
export default SearchResult;