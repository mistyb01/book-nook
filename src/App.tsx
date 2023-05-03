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
import AddEntry from './components/AddEntry';

// TODO: gotta component-ize! 
// TODO: see if theres a better replacement for the any's 
function App() {
  const [displayedList, setDisplayedList] = useState('current');
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <header>
        <h1>book nook</h1>
      </header>
      <main className='spacer-y'>
        <TrackerHeader 
          displayedList={displayedList}
          handleFormReveal={() => setShowForm(!showForm)}
          handleSetDisplayedList={(state: string) => setDisplayedList(state)}/>
        {showForm && <AddEntry/>}
        {displayedList === 'current' ? <CurrentlyReading/> :
        displayedList === 'finished' ? <FinishedList/> :
        <ToReadList/> }
      </main>

    </>
  )
}

export default App
