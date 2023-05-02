import './App.css'
import React, { useState, useEffect, FormEvent } from 'react'; 
import axios from 'axios';
import {Book, BookEntry} from './types';


import TheStrangerCover from './assets/TheStranger.png';
import TravelCatCover from './assets/TravelCat.png';

const API_KEY = 'AIzaSyAN3kV1q00b4WORgbV4TtdLSxDpt5czr9E';

// TODO: gotta component-ize! 
// TODO: see if theres a better replacement for the any's 
// TODO: app breaks with some search queries (like 'aaa')
function App() {
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
      setBookResults(mappedData); // would like to move this to handleForm
      return mappedData;
    } catch(err) {
      setError(err);
    }
  }

  function reformatResults(dataArray : []) : Book[] {
    let formattedData = dataArray.map((item : any)=>({
      "id": item.id,
      "title": item.volumeInfo.title,
      "author": item.volumeInfo.authors,
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
        <ul className="tracker-tabs">
          <li>currently reading</li>
          <li>finished</li>
          <li>want to read</li>
          <button onClick={() => setShowForm(!showForm)}>add new entry</button>
        </ul>

        {showForm && <section className="add-entry-form">
          <form onSubmit={handleForm} className='spacer-x'>
            <label htmlFor='searchInput'>search for a book by title or author</label>
            <input type="text" name="searchInput" value={query} onChange={(e) => setQuery(e.target.value)}></input>
            <button type="submit">go</button>
          </form>
        </section>}

        <section className="search-results spacer-y">
          {loading && <p>loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {bookResults && <button onClick={() => setBookResults(undefined)}>close</button>}
          {bookResults && bookResults.map((item) => (
            <div className="search-results-entry" key={item.id}>
              <h4>{item.title}</h4>
              <p><span className="emphasize">author</span> {item.author[0]}</p>
              <p><span className="emphasize">published</span> {item.publishedDate.substring(0,4)}</p>
            </div>))}
          </section>

        <section className="currently-reading spacer-y">
          <section className="tracker-entry">
            <img src={TheStrangerCover} className="tracker-entry-img"/>
            <div className="tracker-entry-text">
              <h3>The Stranger</h3>
              <p>Albert Camus</p>
              <p>Started reading April 3</p>
              <label htmlFor="pages">Progress:</label>
              <progress id="pages" max="100" value="70"></progress>
            </div>
          </section>

          <section className="tracker-entry">
            <img src={TravelCatCover} className="tracker-entry-img"/>
            <div className="tracker-entry-text">
              <h3>The Traveling Cat Chronicles</h3>
              <p>Hiro Arikawa</p>
              <p>Started reading April 9</p>
              <label htmlFor="pages">Progress:</label>
              <progress id="pages" max="100" value="90"></progress>
            </div>
          </section>
        </section>
      </main>

    </>
  )
}

export default App
