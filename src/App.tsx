import './App.css'
import { Route, Routes,  } from 'react-router-dom';

import TrackerNav from './components/TrackerNav';
import TrackerList from './components/TrackerList';
import AddEntry from './components/AddEntry';

import theme from './components/material-ui/theme';
import { Stack, ThemeProvider, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { useLocalStorage } from 'usehooks-ts';
import { BookEntry } from './types'; 

function App() {
  const [userBooks, setUserBooks] = useLocalStorage<BookEntry[] | undefined>('userBookData', undefined)

  // adds new book to localstorage array
  function addUserBook(newBook:BookEntry) {
    if (!userBooks) {
      setUserBooks([newBook]);
    } else {
      setUserBooks([...userBooks, newBook]);
    }
  }

  // updates information about a book stored in the array
  function updateBookEntry(updatedBook:BookEntry) {
    console.log(updatedBook);
    if (userBooks) {
      setUserBooks(userBooks.map(entry => {
        if (entry.id == updatedBook.id) {
          return {...updatedBook}
        } else {
          return entry;
        }
      }))
    }
  }

  
  // deletes a book
  function deleteBookEntry(bookId:string) {
    if (userBooks) {
      let updatedList = userBooks.filter(entry => entry.id !== bookId)
      setUserBooks(updatedList);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <div className="layout-container">
      <header>
        <Stack direction="row" justifyContent="center">
        <Typography variant="logo">book nook</Typography>
        </Stack>
      </header>
      <main>
        <Stack spacing={2}>
        <TrackerNav/>
        <Routes>
          <Route path=''
          element={
            <TrackerList listType="current" userBooks={userBooks}
            handleUserBookUpdate={(newBook:BookEntry)=>updateBookEntry(newBook)}
            handleBookDelete={(bookId:string)=>deleteBookEntry(bookId)}/>
          }/>
          <Route path='/finished'
          element={
            <TrackerList listType="finished" userBooks={userBooks}
            handleUserBookUpdate={(newBook:BookEntry)=>updateBookEntry(newBook)}
            handleBookDelete={(bookId:string)=>deleteBookEntry(bookId)}/>
          }/>
          <Route path='/toread'
          element={
            <TrackerList listType="tbr" userBooks={userBooks}
            handleUserBookUpdate={(newBook:BookEntry)=>updateBookEntry(newBook)}
            handleBookDelete={(bookId:string)=>deleteBookEntry(bookId)}/>
          }/>
          <Route path='/new'
          element={
            <AddEntry handleUserBookUpdate={(newBook:BookEntry)=>addUserBook(newBook)}/>
          }/>
        </Routes>
        </Stack>
      </main>
      </div>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
