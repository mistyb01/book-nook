import './App.css'
import React, { useState, useEffect, FormEvent } from 'react'; 
import axios from 'axios';
import {Book, BookEntry} from './types';

const API_KEY = 'AIzaSyAN3kV1q00b4WORgbV4TtdLSxDpt5czr9E';

import CurrentlyReading from './components/CurrentlyReading';
import FinishedList from './components/FinishedList';
import ToReadList from './components/ToReadList';

import TrackerHeader from './components/TrackerHeader';
import SearchResult from './components/SearchResult';

// TODO: gotta component-ize! 
// TODO: see if theres a better replacement for the any's 
function App() {
  const [displayedList, setDisplayedList] = useState('current');

  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null); 

  const [bookResults, setBookResults] = useState<Book[] | undefined>();

  // TODO: is there a better way to write the functions of handleForm and getData?
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
      <header>
        <h1>book nook</h1>
      </header>
      <main className='spacer-y'>
        <TrackerHeader 
        displayedList={displayedList}
        handleFormReveal={() => setShowForm(!showForm)}
        handleSetDisplayedList={(state: string) => setDisplayedList(state)}
        />

        {showForm && <section className="add-entry-form">
          <form onSubmit={handleForm} className='spacer-x'>
            <label htmlFor='searchInput'>search for a book by title or authors</label>
            <input type="text" name="searchInput" value={query} onChange={(e) => setQuery(e.target.value)}></input>
            <button type="submit">go</button>
          </form>
        </section>}

        <section className="search-results spacer-y">
          {bookResults && <button onClick={() => setBookResults(undefined)}>close</button>}
          {loading && <p>loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {bookResults && bookResults.map((item) => (
            <SearchResult 
              id={item.id}
              title={item.title}
              authors={item.authors}
              publisher={item.publisher}
              publishedDate={item.publishedDate}
              pageCount={item.pageCount}
            />))}
          </section>

          {displayedList === 'current' ? <CurrentlyReading/> :
          displayedList === 'finished' ? <FinishedList/> :
          <ToReadList/> }
          
      </main>

    </>
  )
}

export default App
