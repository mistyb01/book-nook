import './App.css'
import React, { useState, useEffect } from 'react'; 

import CurrentlyReading from './components/CurrentlyReading';
import FinishedList from './components/FinishedList';
import ToReadList from './components/ToReadList';

import TrackerHeader from './components/TrackerHeader';
import AddEntry from './components/AddEntry';

function App() {
  const [display, setDisplay] = useState('current');

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
        <AddEntry/> }
      </main>

    </>
  )
}

export default App
