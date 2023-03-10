import './App.css';

import * as Mui from '@mui/material'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { getThemeMode, rewriteThemeMode } from './Theme'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';

import Home from './Home'
import Navigation from './components/navigation/Navigation'
import AccessibilityTool from './components/accessibility/AccessibilityTool'

import Login from './components/users/Login'
import SignUp from './components/users/SignUp'
import SearchPlayer from './components/users/SearchPlayer'
import Leaderboards from './components/leaderboards/Leaderboards'
import GameLauncher from './components/game/GameLauncher'
import Game from './components/game/Game'
import Error404 from './Error404'
import PostGame from './components/game/PostGame';

function App() {

  let [themeMode, setThemeMode] = useState(getThemeMode())

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
    }
  })

  const toggleThemeMode = () => {
    if (themeMode === 'light') {
      setThemeMode(rewriteThemeMode('dark'))
    } else {
      setThemeMode(rewriteThemeMode('light'))
    }
  }

  return (
    <div className='App'>
      <Router>
        <ThemeProvider theme={theme}>
          <Mui.Paper sx={{
            minHeight: '100vh',
            backgroundImage: themeMode === 'light' ? 'url(white-questionmark-background-glow-lightmode.jpg)' : 'url(white-questionmark-background-glow-darkmode.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            backgroundBlendMode: 'multiply',
          }}>
            <Navigation />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<SignUp />} />
              <Route exact path='/searchplayer' element={<SearchPlayer />} />
              <Route exact path='/leaderboards' element={<Leaderboards />} />
              <Route exact path='/gamelauncher' element={<GameLauncher />} />
              <Route exact path='/game' element={<Game />} />
              <Route exact path='/postgame' element={<PostGame />} />
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
