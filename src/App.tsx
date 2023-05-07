import './App.css'
import React, { useState, useEffect } from 'react'; 

import CurrentlyReading from './components/CurrentlyReading';
import FinishedList from './components/FinishedList';
import ToReadList from './components/ToReadList';

import TrackerHeader from './components/TrackerHeader';
import AddEntry from './components/AddEntry';
import { useLocalStorage } from 'usehooks-ts';
import { BookEntry } from './types'; 
import TabPanel from './components/material-ui/TabPanel';
import FloatingActionButton from './components/material-ui/FloatingActionButton';

function App() {
  const [userBooks, setUserBooks] = useLocalStorage<BookEntry[] | undefined>('userBookData', undefined)

  function updateUserBooks(newBook:BookEntry) {
    if (!userBooks) {
      setUserBooks([newBook]);
    } else {
      setUserBooks([...userBooks, newBook]);
    }
  }

  const [value, setValue] = useState(0);
  const [displayForm, setDisplayForm] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    
  };

  const handleDisplay = () => {
    setValue(3);
  }

  return (
    <>
      <header>
        <h1>book nook</h1>
      </header>
      <main className='spacer-y'>
        <TrackerHeader value={value} handleChange={handleChange}/>
          <TabPanel value={value} index={0}>
            <CurrentlyReading userBooks={userBooks}/> 
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FinishedList userBooks={userBooks}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ToReadList userBooks={userBooks}/>
          </TabPanel> 
          <TabPanel value={value} index={3}>
          <AddEntry handleUserBookUpdate={(newBook:BookEntry)=>updateUserBooks(newBook)}/>
          </TabPanel> 
        <FloatingActionButton handleDisplay={handleDisplay}/>
        {/* {display === 'current' ? <CurrentlyReading userBooks={userBooks}/> :
        display === 'finished' ? <FinishedList userBooks={userBooks}/> :
        display === 'tbr' ? <ToReadList userBooks={userBooks}/> : 
        <AddEntry handleUserBookUpdate={(newBook:BookEntry)=>updateUserBooks(newBook)}/> } */}

      </main>

    </>
  )
}

export default App
