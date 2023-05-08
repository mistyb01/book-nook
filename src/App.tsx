import './App.css'
import React, { useState } from 'react'; 

import TrackerHeader from './components/TrackerHeader';
import AddEntry from './components/AddEntry';
import { useLocalStorage } from 'usehooks-ts';
import { BookEntry } from './types'; 

import { ThemeProvider, Typography } from '@mui/material';
import { CssBaseline } from '@mui/material/';
import theme from './components/material-ui/theme';
import TabPanel from './components/material-ui/TabPanel';
import TrackerList from './components/TrackerList';
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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);    
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <header>
        <Typography variant="logo">book nook</Typography>
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
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
