import * as Mui from '@mui/material'

import { useState, useEffect, Suspense, Fragment } from 'react'
import { useLocation } from 'react-router-dom'

import axios from 'axios'
import { promiseSuspender } from '../../promiseSuspender'
import GameContainer from './game_container/GameContainer'

export default function Game() {

    const location = useLocation()
    const triviaSettings = location.state // Trivia settings established in the game launcher screen are initialized

    let [triviaAPIData, setTriviaAPIData] = useState(null) // Stores all trivia data processed at '/trivia' endpoint in backend

    // Requests a fresh set of trivia questions onload according to passed trivia settings
    useEffect(() => {
        // Axios request is wrapped in a suspender helper function and assigned to triviaAPIData
        const suspenseTriviaData = promiseSuspender(
            axios.post(`${process.env.REACT_APP_SERVER_URL}trivia`, triviaSettings)
                .then(response => {
                    return response.data
                })
                .catch(error => {
                    console.log(error) // *** PLACEHOLDER ***
                })
        )
        setTriviaAPIData(suspenseTriviaData)

    }, [triviaSettings])

    // Render while suspense is triggered and data is loading
    const suspenseSkeleton = (
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

    return (
        <Fragment>
            <Mui.Container maxWidth='x1' sx={{
                display: 'flex',
                height: '80px',
                background: 'radial-gradient(circle, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 90%)',
                backdropFilter: 'blur(5px)',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Mui.Typography variant='h2' color='white' noWrap>
                    {triviaSettings.gameMode.toUpperCase()} TRIVIA
                </Mui.Typography>
            </Mui.Container>

            <Mui.Container maxWidth='lg' component='main' sx={{
                mt: 10
            }}>
                {triviaAPIData &&
                    <Suspense fallback={suspenseSkeleton}>
                        <GameContainer triviaAPIData={triviaAPIData} triviaSettings={triviaSettings} />
                    </Suspense>
                }
            </Mui.Container>
        </Fragment>
    )
}