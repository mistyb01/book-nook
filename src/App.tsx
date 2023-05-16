import './App.css'
import { Route, Routes,  } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Logo from './components/Logo';
import TrackerNav from './components/TrackerNav';
import FloatingActionButton from './components/material-ui/FloatingActionButton';
import TrackerList from './components/TrackerList';
import AddEntry from './components/AddEntry';

import theme from './components/material-ui/theme';
import { Stack, ThemeProvider } from '@mui/material';
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
      let index = userBooks.findIndex(entry => entry.id === updatedBook.id);
      userBooks[index] = updatedBook;
      setUserBooks(userBooks);
    }
  }

  
  // deletes a book
  function deleteBookEntry(bookId:string) {
    if (userBooks) {
      let index = userBooks.findIndex(entry => entry.id === bookId);
      userBooks?.splice(index, 1);
      console.log(userBooks);
      setUserBooks(userBooks);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <header>
        <Logo/>
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
        <Link to='/new'><FloatingActionButton/></Link>
      </main>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
