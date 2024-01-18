import * as Mui from '@mui/material'

import { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import axios from 'axios'
import GameContainer from './game_container/GameContainer'
import { useTheme } from '@emotion/react'

import { StatusBar } from '../contexts/StatusBar'

export default function Game() {

    const location = useLocation()
    const triviaSettings = location.state // Trivia settings established in the game launcher screen are initialized
    const theme = useTheme()
    
    const { deployStatusMessage } = useContext(StatusBar)
    
    let [triviaAPIData, setTriviaAPIData] = useState(null) // Stores all trivia data processed at '/trivia' endpoint in backend

    // Requests a fresh set of trivia questions onload according to passed trivia settings
    useEffect(() => {
        // Axios request to fetch trivia data
        axios.post(`${process.env.REACT_APP_SERVER_URL}trivia`, triviaSettings)
            .then(response => {
                setTriviaAPIData(response.data)
            })
            .catch(error => {
                if (error.response) {
                    deployStatusMessage(error.response.data.message, 'error')
                } else {
                    deployStatusMessage(error.message, 'error')
                }
            })
    }, [triviaSettings])

    // Render while trivia data is being fetched
    function GameSkeleton() {
        return (
            <Mui.Paper elevation={5} sx={{ p: { xs: 1, md: 2 } }}>

                <Mui.Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>

                    <Mui.Skeleton variant="rounded" sx={{ width: { xs: 120, sm: 1 / 4, md: 1 / 5 }, height: { xs: 16, sm: 23, md: 30, lg: 36 } }} />

                    <Mui.Skeleton variant="rounded" sx={{ width: { xs: 120, sm: 1 / 4, md: 1 / 5 }, height: { xs: 16, sm: 23, md: 30, lg: 36 } }} />

                </Mui.Box>

                <Mui.Paper variant='outlined' sx={{ mt: { xs: 1, md: 2 }, p: { xs: 1, md: 2 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                    <Mui.Typography fontSize={{ xs: 20, sm: 25, md: 30, lg: 35 }}>...Loading Trivia...</Mui.Typography>

                    <Mui.Box sx={{ m: { xs: 1, sm: 2, md: 3 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Mui.Skeleton variant="rounded" width='100%' sx={{ height: { xs: 3, sm: 5, md: 8, lg: 10 } }} />
                    </Mui.Box>

                    <Mui.Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>

                        <Mui.Grid item xs={6}>
                            <Mui.Skeleton variant="rounded" width='100%' sx={{ height: { xs: 16, sm: 23, md: 30, lg: 36 } }} />
                        </Mui.Grid>

                        <Mui.Grid item xs={6}>
                            <Mui.Skeleton variant="rounded" width='100%' sx={{ height: { xs: 16, sm: 23, md: 30, lg: 36 } }} />
                        </Mui.Grid>

                        <Mui.Grid item xs={6}>
                            <Mui.Skeleton variant="rounded" width='100%' sx={{ height: { xs: 16, sm: 23, md: 30, lg: 36 } }} />
                        </Mui.Grid>

                        <Mui.Grid item xs={6}>
                            <Mui.Skeleton variant="rounded" width='100%' sx={{ height: { xs: 16, sm: 23, md: 30, lg: 36 } }} />
                        </Mui.Grid>

                    </Mui.Grid>
                </Mui.Paper>
            </Mui.Paper>
        )
    }

    return (
        <Mui.Container disableGutters sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
        }}>

            <Mui.Box sx={{
                display: 'flex',
                background: `radial-gradient(circle, ${theme.palette.background.paper} 20%, rgba(0,0,0,0) 70%)`,
                backdropFilter: 'blur(5px)',
                justifyContent: 'center',
                my: 2,
                py: 2
            }}>
                <Mui.Typography variant='h2' fontWeight={500} fontSize={{ xs: 25, sm: 30, md: 35, lg: 40 }} noWrap>
                    {triviaSettings.gameMode.toUpperCase()} TRIVIA
                </Mui.Typography>
            </Mui.Box>

            <Mui.Container maxWidth='lg' component='main' sx={{
                my: 'auto'
            }}>
                {triviaAPIData ?
                    <GameContainer triviaAPIData={triviaAPIData} triviaSettings={triviaSettings} />
                    :
                    <GameSkeleton />
                }
            </Mui.Container>

        </Mui.Container>
    )
}