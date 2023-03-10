import * as Mui from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import { useState, useEffect, Suspense, Fragment } from 'react'
import { useLocation } from 'react-router-dom'

import axios from 'axios'
import { promiseSuspender } from '../../promiseSuspender'
import GameContainer from './game_container/GameContainer'

export default function Game() {

    const location = useLocation()
    const triviaSettings = location.state
    let [triviaAPIData, setTriviaAPIData] = useState(null)

    useEffect(() => {
        const fetchTriviaData = async () => {
            const { data } = await axios.post('http://localhost:5000/trivia', triviaSettings)
                // Mentor said I can't use catch and await apparently
                .catch(error => {
                    console.log(error) // *** PLACEHOLDER ***
                })
            return data
        }

        // Fetch function is wrapped in a suspender helper function and assigned to triviaAPIData
        const suspenseTriviaData = promiseSuspender(fetchTriviaData())
        setTriviaAPIData(suspenseTriviaData)

    }, [triviaSettings])

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
                    <Suspense fallback={
                        <Fragment>
                            <Mui.Typography variant='h3'>Loading Trivia Game...</Mui.Typography>
                            <CircularProgress />
                        </Fragment>
                    }>
                        <GameContainer triviaAPIData={triviaAPIData} triviaSettings={triviaSettings} />
                    </Suspense>
                }
            </Mui.Container>
        </Fragment>
    )
}