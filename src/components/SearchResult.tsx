import { Book } from "../types"
import { Stack, Card, Button, CardContent, Typography, CardActions } from '@mui/material';
 

type Props = {
    book: Book,
    handleSetSelectedBook: Function
}

const SearchResult = ({book, handleSetSelectedBook}: Props) => {
    return (
        <Card variant="outlined" key={book.id}  sx={{ 
            display: 'flex', 
            flexDirection: {xs: 'column', sm: 'row'}, 
            justifyContent: 'space-between' }}>
            <Stack direction={{xs: "column", sm: "row"}} spacing={2}>
                <img src={book.image}/>
                <CardContent>
                    <Typography variant="entryHeader">{book.title}</Typography>
                    <Typography variant="body1">
                        {book.authors && <p><Typography variant="emphasis">authors</Typography> {book.authors.join(', ')}</p>}
                        {book.publisher && <p><Typography variant="emphasis">publisher</Typography> {book.publisher}</p>}
                        {book.publishedDate && <p><Typography variant="emphasis">year</Typography> {book.publishedDate.substring(0,4)}</p>}
                    </Typography>
                </CardContent>
            </Stack>
            <CardActions>
                <Button size="medium" onClick={()=>handleSetSelectedBook(book)}>select</Button>
            </CardActions>
        </Card>
    )
}
export default SearchResult;