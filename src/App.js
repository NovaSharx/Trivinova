import './App.css';

import { ThemeProvider, createTheme } from '@mui/material/styles'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import Home from './Home'
import Navigation from './Navigation'
import Login from './components/users/Login'
import SignUp from './components/users/SignUp'
import Error404 from './Error404'

function App() {

  let [themeMode, setThemeMode] = useState('light')

  let theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#2f9a2f',
      },
      secondary: {
        main: '#ff3d00',
      },
      error: {
        main: '#d32f2f',
      },
    },
  })

  return (
    <div className='App'>
      <Router>
        <ThemeProvider theme={theme}>
          <Navigation />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route path='/' element={<Error404 />} />
          </Routes>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
