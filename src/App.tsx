import './App.css'
import React, { useState, useEffect } from 'react';
import TheStrangerCover from './assets/TheStranger.png';
import TravelCatCover from './assets/TravelCat.png';

const API_KEY = 'AIzaSyAN3kV1q00b4WORgbV4TtdLSxDpt5czr9E';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');

  const handleForm = (e:any) => {
    e.preventDefault();
    console.log(query);
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

        <section className="currently-reading spacer-y">
          <section className="tracker-entry">
            <img src={TheStrangerCover} className="tracker-entry-img"/>
            <div className="tracker-entry-text">
              <h3>The Stranger</h3>
              <p>Albert Camus</p>
              <p>Started reading April 3</p>
              <p>Progress: 90/122</p>
            </div>
          </section>

          <section className="tracker-entry">
            <img src={TravelCatCover} className="tracker-entry-img"/>
            <div className="tracker-entry-text">
              <h3>The Traveling Cat Chronicles</h3>
              <p>Hiro Arikawa</p>
              <p>Started reading April 9</p>
              <p>Progress: 150/270</p>
            </div>
          </section>
        </section>
      </main>

    </>
  )
}

export default App
