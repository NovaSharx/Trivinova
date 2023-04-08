import * as Mui from '@mui/material'

import { useState, useEffect, Fragment } from 'react'
import { useLocation } from 'react-router-dom'

import axios from 'axios'
import GameContainer from './game_container/GameContainer'
import { useTheme } from '@emotion/react'

export default function Game() {

    const location = useLocation()
    const triviaSettings = location.state // Trivia settings established in the game launcher screen are initialized
    const theme = useTheme()

    let [triviaAPIData, setTriviaAPIData] = useState(null) // Stores all trivia data processed at '/trivia' endpoint in backend

    // Requests a fresh set of trivia questions onload according to passed trivia settings
    useEffect(() => {
        // Axios request is wrapped in a suspender helper function and assigned to triviaAPIData
        axios.post(`${process.env.REACT_APP_SERVER_URL}trivia`, triviaSettings)
            .then(response => {
                setTriviaAPIData(response.data)
            })
            .catch(error => {
                console.log(error) // *** PLACEHOLDER ***
            })

    }, [triviaSettings])

    // Render while suspense is triggered and data is loading
    function SuspenseSkeleton() {
        return (
            <Mui.Paper elevation={5} sx={{ p: 2 }}>

                <Mui.Box sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>

                    <Mui.Skeleton variant="rounded" width={160} height={36} />

                    <Mui.Skeleton variant="rounded" width={160} height={36} />

                </Mui.Box>

                <Mui.Paper variant='outlined' sx={{ m: 2, p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                    <Mui.Typography variant='h3'>...Loading Trivia...</Mui.Typography>

                    <Mui.Box sx={{ m: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Mui.Skeleton variant="rounded" width='100%' height={10} />
                    </Mui.Box>

                    <Mui.Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>

                        <Mui.Grid item xs={6}>
                            <Mui.Skeleton variant="rounded" width='100%' height={36} />
                        </Mui.Grid>

                        <Mui.Grid item xs={6}>
                            <Mui.Skeleton variant="rounded" width='100%' height={36} />
                        </Mui.Grid>

                        <Mui.Grid item xs={6}>
                            <Mui.Skeleton variant="rounded" width='100%' height={36} />
                        </Mui.Grid>

                        <Mui.Grid item xs={6}>
                            <Mui.Skeleton variant="rounded" width='100%' height={36} />
                        </Mui.Grid>

                    </Mui.Grid>
                </Mui.Paper>
            </Mui.Paper>
        )
    }

    return (
        <Fragment>
            <Mui.Box sx={{
                display: 'flex',
                height: '80px',
                background: `radial-gradient(circle, ${theme.palette.background.paper} 20%, rgba(0,0,0,0) 70%)`,
                backdropFilter: 'blur(5px)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Mui.Typography variant='h2' fontWeight={500} noWrap>
                    {triviaSettings.gameMode.toUpperCase()} TRIVIA
                </Mui.Typography>
            </Mui.Box>

            <Mui.Container maxWidth='lg' component='main' sx={{
                mt: 10
            }}>
                {triviaAPIData ?
                    <GameContainer triviaAPIData={triviaAPIData} triviaSettings={triviaSettings} />
                    :
                    <SuspenseSkeleton />
                }
            </Mui.Container>
        </Fragment>
    )
}