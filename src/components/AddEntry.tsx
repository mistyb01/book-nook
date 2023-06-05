import { useState, FormEvent, useEffect } from 'react'; 
import { Book, BookEntry } from '../types';
import SearchResult from './SearchResult';
import NewEntryForm from './NewEntryForm';
import axios from 'axios';
import { Stack, Button, TextField, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const AddEntry = ({handleUserBookUpdate} : {handleUserBookUpdate: Function}) => {
    const API_KEY = 'AIzaSyAN3kV1q00b4WORgbV4TtdLSxDpt5czr9E';

    const [bookResults, setBookResults] = useState<Book[] | undefined>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null); 
    const [query, setQuery] = useState('');

    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
      selectedBook ? setShowForm(true) : setShowForm(false);
    }, [selectedBook])

    async function handleForm(e:FormEvent) {
        try {
          e.preventDefault();
          setLoading(true);
          const res = await getData();
          setLoading(false);
          setBookResults(res as Book[]);
          console.log("fin:", res); 
        } catch(err) {
          console.error("error: ", err);
        }
      }
    
      async function getData() {
        try {
          let response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`);
          console.log(response.data);
          let mappedData = reformatResults(response.data.items);
          return mappedData;
        } catch(err) {
          setError(err);
        }
      }
    
      function reformatResults(dataArray : []) : Book[] {
        
        let formattedData = dataArray.map((item : any)=>{
          const newObj = {
            "id": item.id,
            "title": item.volumeInfo.title,
            "authors": item.volumeInfo.authors,
            "publisher": item.volumeInfo.publisher,
            "pageCount": item.volumeInfo.pageCount,
            "publishedDate": item.volumeInfo.publishedDate,
            "image": undefined
          }
          if (item.volumeInfo.imageLinks) {
            newObj.image = item.volumeInfo.imageLinks.thumbnail.toString()
          }
            return newObj;
        });
        return formattedData;
      }
    

    return (
        <Stack spacing={2}>
        {selectedBook && <NewEntryForm book={selectedBook} 
        sendBookData={(newBook:BookEntry)=>handleUserBookUpdate(newBook)}/>}

          <form onSubmit={handleForm}>
            <Stack direction="row" spacing={1}>
              <TextField fullWidth autoFocus
                id="searchInput"
                label="Find a book by title, author, ISBN"
                variant="filled"
                value={query}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setQuery(event.target.value);
                }}/>
              <Button variant="outlined" type="submit">Search</Button>
              </Stack>
          </form>
        
        <Stack spacing={2}>
            {loading &&  
            <Box sx={{display: "flex", justifyContent: "center", margin: "2rem"}}>
              <CircularProgress />
            </Box>
            }
            {error && <p>Error: {error.message}</p>}
            {bookResults && bookResults.map((item) => (
            <SearchResult 
                key={item.id}
                id={item.id}
                title={item.title}
                authors={item.authors}
                publisher={item.publisher}
                publishedDate={item.publishedDate}
                pageCount={item.pageCount}
                image={item.image}
                handleSetSelectedBook={(book: Book) => setSelectedBook(book)}
            />))}
          </Stack>
        </Stack>
    )
}

export default AddEntry;