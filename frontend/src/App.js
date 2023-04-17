import './App.css';

import * as Mui from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getThemeMode, rewriteThemeMode } from './Theme';

import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Home from './Home';
import Navigation from './components/navigation/Navigation';
import AccessibilityTool from './components/accessibility/AccessibilityTool';

import Login from './components/users/Login';
import SignUp from './components/users/SignUp';
import SearchPlayer from './components/users/SearchPlayer';
import Leaderboards from './components/leaderboards/Leaderboards';
import GameLauncher from './components/game/GameLauncher';
import Game from './components/game/Game';
import Error404 from './Error404';
import PostGame from './components/game/PostGame';
import CurrentUserProvider from './components/contexts/CurrentUser';
import Profile from './components/users/accounts/Profile';
import AccountDetails from './components/users/accounts/AccountDetails';

function App() {

  let [themeMode, setThemeMode] = useState(getThemeMode()) // Grabs theme token from local storage (light/dark)

  // Theme variables are defined here with themeMode state governing light/dark mode
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
    typography: {
      fontFamily: 'Montserrat',
    },
  })

  // Toggle between light and dark mode when called
  const toggleThemeMode = () => {
    if (themeMode === 'light') {
      setThemeMode(rewriteThemeMode('dark'))
    } else {
      setThemeMode(rewriteThemeMode('light'))
    }
  }

  return (
    <div className='App'>
      <HashRouter>
        <CurrentUserProvider>
          <ThemeProvider theme={theme}>
            <Mui.Paper square sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              backgroundImage: themeMode === 'light' ? 'url(white-questionmark-background-glow-lightmode.jpg)' : 'url(white-questionmark-background-glow-darkmode.jpg)', // Change game background wallpaper according to the current theme mode
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <Navigation />
              <Mui.Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Routes>
                  <Route exact path='/' element={<Home />} />
                  <Route exact path='/login' element={<Login />} />
                  <Route exact path='/signup' element={<SignUp />} />
                  <Route exact path='/profile' element={<Profile />} />
                  <Route exact path='/accountdetails' element={<AccountDetails />} />
                  <Route exact path='/searchplayer' element={<SearchPlayer />} />
                  <Route exact path='/leaderboards' element={<Leaderboards />} />
                  <Route exact path='/gamelauncher' element={<GameLauncher />} />
                  <Route exact path='/game' element={<Game />} />
                  <Route exact path='/postgame' element={<PostGame />} />
                  <Route path='/' element={<Error404 />} />
                </Routes>
              </Mui.Box>
              <AccessibilityTool toggleThemeMode={toggleThemeMode} />
            </Mui.Paper>
          </ThemeProvider>
        </CurrentUserProvider>
      </HashRouter>
    </div>
  );
}

export default App;
