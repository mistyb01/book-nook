import { Book } from "../types"
import { Card, Button, CardContent, Typography, CardActions } from '@mui/material';
 

type Props = Book & {handleSetSelectedBook: Function}

const SearchResult = ({id, title, authors, publisher, publishedDate, pageCount, handleSetSelectedBook, image }: Props) => {
    const book = {id,title,authors,publisher,publishedDate,pageCount, image} // can i shorten this 
    return (
        <Card variant="outlined" key={id}  sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <img src={image}/>
            <CardContent>
                <Typography variant="entryHeader">{title}</Typography>
                <Typography variant="body1">
                    {authors && <p><Typography variant="emphasis">authors</Typography> {authors.join(', ')}</p>}
                    {publisher && <p><Typography variant="emphasis">publisher</Typography> {publisher}</p>}
                    {publishedDate && <p><Typography variant="emphasis">year</Typography> {publishedDate.substring(0,4)}</p>}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="medium" onClick={()=>handleSetSelectedBook(book)}>select</Button>
            </CardActions>
        </Card>
    )
}
export default SearchResult;