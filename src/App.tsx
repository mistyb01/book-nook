import './App.css'
import React, { useState, useEffect } from 'react'; 

import CurrentlyReading from './components/CurrentlyReading';
import FinishedList from './components/FinishedList';
import ToReadList from './components/ToReadList';

import TrackerHeader from './components/TrackerHeader';
import AddEntry from './components/AddEntry';
import { useLocalStorage } from 'usehooks-ts';
import { BookEntry } from './types'; 

function App() {
  const [display, setDisplay] = useState('current');
  const [userBooks, setUserBooks] = useLocalStorage<BookEntry[] | undefined>('userBookData', undefined)

  function updateUserBooks(newBook:BookEntry) {
    if (!userBooks) {
      setUserBooks([newBook]);
    } else {
      setUserBooks([...userBooks, newBook]);
    }
  }

  return (
    <>
      <header>
        <h1>book nook</h1>
      </header>
      <main className='spacer-y'>
        <TrackerHeader 
          display={display}
          handleSetDisplay={(state: string) => setDisplay(state)}/>
        {display === 'current' ? <CurrentlyReading/> :
        display === 'finished' ? <FinishedList/> :
        display === 'tbr' ? <ToReadList/> : 
        <AddEntry handleUserBookUpdate={(newBook:BookEntry)=>updateUserBooks(newBook)}/> }
      </main>

    </>
  )
}

export default App
