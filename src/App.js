import './App.css';

import * as Mui from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import Home from './Home'
import Navigation from './components/navigation/Navigation'
import AccessibilityTool from './components/accessibility/AccessibilityTool'

import Login from './components/users/Login'
import SignUp from './components/users/SignUp'
import Leaderboards from './components/leaderboards/Leaderboards'
import GameLauncher from './components/game/GameLauncher'
import Game from './components/game/Game'
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

  const toggleThemeMode = () => {
    if (themeMode === 'light') {
      setThemeMode('dark')
    } else {
      setThemeMode('light')
    }
  }

  return (
    <div className='App'>
      <Router>
        <ThemeProvider theme={theme}>
          <Mui.Paper sx={{ minHeight: '100vh' }}>
            <Navigation />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<SignUp />} />
              <Route exact path='/leaderboards' element={<Leaderboards />} />
              <Route exact path='/gamelauncher' element={<GameLauncher />} />
              <Route exact path='/game' element={<Game />} />
              <Route path='/' element={<Error404 />} />
            </Routes>
            <AccessibilityTool toggleThemeMode={toggleThemeMode} />
          </Mui.Paper>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
