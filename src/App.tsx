import './App.css'
import React, { useState, useEffect } from 'react'; 

import TrackerHeader from './components/TrackerHeader';
import AddEntry from './components/AddEntry';
import { useLocalStorage } from 'usehooks-ts';
import { BookEntry } from './types'; 
import TabPanel from './components/material-ui/TabPanel';
import FloatingActionButton from './components/material-ui/FloatingActionButton';
import TrackerList from './components/TrackerList';

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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);    
  };

  return (
    <>
      <header>
        <h1>book nook</h1>
      </header>
      <main>
        <TrackerHeader value={value} handleChange={handleChange}/>
        <TabPanel value={value} index={0}>
          <TrackerList listType="current" userBooks={userBooks}/> 
        </TabPanel>

        <TabPanel value={value} index={1}>
          <TrackerList listType="finished" userBooks={userBooks}/>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <TrackerList listType="tbr" userBooks={userBooks}/>
        </TabPanel> 

        <TabPanel value={value} index={3}>
          <AddEntry handleUserBookUpdate={(newBook:BookEntry)=>updateUserBooks(newBook)}/>
        </TabPanel> 
        
        <FloatingActionButton handleDisplay={() => setValue(3)}/>
      </main>

    </>
  )
}

export default App
