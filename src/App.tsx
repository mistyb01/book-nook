import './App.css'
import { Route, Routes,  } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Logo from './components/Logo';
import TrackerNav from './components/TrackerNav';
import FloatingActionButton from './components/material-ui/FloatingActionButton';
import TrackerList from './components/TrackerList';
import AddEntry from './components/AddEntry';

import theme from './components/material-ui/theme';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { useLocalStorage } from 'usehooks-ts';
import { BookEntry } from './types'; 

function App() {
  const [userBooks, setUserBooks] = useLocalStorage<BookEntry[] | undefined>('userBookData', undefined)

  function updateUserBooks(newBook:BookEntry) {
    if (!userBooks) {
      setUserBooks([newBook]);
    } else {
      setUserBooks([...userBooks, newBook]);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
      <header>
        <Logo/>
      </header>
      <main>
          <TrackerNav/>
          <Routes>
            <Route path=''
            element={
              <TrackerList listType="current" userBooks={userBooks}/>
            }/>
            <Route path='/finished'
            element={
              <TrackerList listType="finished" userBooks={userBooks}/>
            }/>
            <Route path='/toread'
            element={
              <TrackerList listType="tbr" userBooks={userBooks}/>
            }/>
            <Route path='/new'
            element={
              <AddEntry handleUserBookUpdate={(newBook:BookEntry)=>updateUserBooks(newBook)}/>
            }/>
          </Routes>
          <Link to='/new'><FloatingActionButton/></Link>
      </main>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App
