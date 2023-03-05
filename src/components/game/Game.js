import * as Mui from '@mui/material'
import { useState, useEffect, Suspense } from 'react'
import { useLocation } from 'react-router-dom'

import { promiseSuspender } from '../../promiseSuspender'

export default function Game() {

    const location = useLocation()
    const triviaSettings = location.state

    let [triviaAPIData, setTriviaAPIData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/trivia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(triviaSettings)
            })
            const data = await response.json()
            return data
        }
        setTriviaAPIData(promiseSuspender(fetchData()))
    }, [triviaSettings])

    const renderGame = () => {

        function Tester() {
            const data = triviaAPIData.result.read()

            return <h1> Content Loaded: {data}</h1>
        }

        if (triviaAPIData) {
            return (
                <Suspense fallback={<Mui.Skeleton variant="rounded" width={210} height={60} />}>
                    <Tester />
                </Suspense>
            )
        }
    }

    return (
        <>
            <h1>Game</h1>
            <Mui.Button href='/gamelauncher' variant='contained'>
                Back to Game Launcher
            </Mui.Button>
            <h2>{triviaSettings.gameMode}</h2>
            {renderGame()}
        </>
    )
}