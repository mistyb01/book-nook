import { useState, FormEvent } from 'react'; 
import { Book } from '../types';
import SearchResult from './SearchResult';
import NewEntryForm from './NewEntryForm';
import axios from 'axios';

const AddEntry = () => {
    const API_KEY = 'AIzaSyAN3kV1q00b4WORgbV4TtdLSxDpt5czr9E';

    const [bookResults, setBookResults] = useState<Book[] | undefined>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null); 
    const [query, setQuery] = useState('');

    const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

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
        let formattedData = dataArray.map((item : any)=>({
          "id": item.id,
          "title": item.volumeInfo.title,
          "authors": item.volumeInfo.authors,
          "publisher": item.volumeInfo.publisher,
          "pageCount": item.volumeInfo.pageCount,
          "publishedDate": item.volumeInfo.publishedDate
        }));
        return formattedData;
      }
    

    return (
        <>
        <section className="add-entry-form">
          <form onSubmit={handleForm} className='spacer-x'>
            <label htmlFor='searchInput'>search for a book by title or authors</label>
            <input type="text" name="searchInput" value={query} onChange={(e) => setQuery(e.target.value)}></input>
            <button type="submit">go</button>
          </form>
        </section>

        {selectedBook && <NewEntryForm book={selectedBook}/>}

        <section className="search-results spacer-y">
            {loading && <p>loading...</p>}
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
                handleSetSelectedBook={(book: Book) => setSelectedBook(book)}
            />))}
          </section>
        </>
    )
}

export default AddEntry;