import * as Mui from '@mui/material';

import { Fragment, useEffect, useState } from 'react';

export default function GameTimer(props) {

    const { checkAnswer, setTimeTaken } = props // Destructured utility functions passed from game container

    const duration = 30000 // Time limit for prompted questions

    let [endTime] = useState(Date.now() + 1000 * duration) // Stores the date in which the timer should run out
    let [timeLeft, setTimeLeft] = useState(duration) // Stores the amount of time left on timer
    let [timeoutId, setTimeoutId] = useState() // Stores the timeout ID need to end the current running timeout function

    useEffect(() => { }, [timeLeft]) // Rerenders timer bar everytime timeLeft is updated in order to match time being displayed

    // Countdown logic
    const countdown = () => {
        if (timeLeft < 0) return // If there is no time left then exit function

        let timeout = setTimeout(() => {
            setTimeoutId(timeout) // Store current timeout ID

            const millisecondsLeft = endTime - Date.now() // Calculate current number of milliseconds left before timer hits 0
            setTimeLeft(millisecondsLeft / 1000) // Store seconds left
            setTimeTaken((duration - (millisecondsLeft / 1000)).toFixed(2)) // Store number of seconds passed to the nearest 100th since timer began

            // End the timer once it hits 0 or less
            if (millisecondsLeft < 0) {
                endTimer()
            }
        })
    }

    const endTimer = () => {
        clearTimeout(timeoutId) // Cancel current timeout function
        checkAnswer('') // Pass a blank answer since time ran out
    }

    countdown()

    return (
        <Fragment>
            <Mui.Box sx={{ m: { xs: 1, sm: 2, md: 3 } }}>
                <Mui.Typography sx={{ fontSize: { xs: 8, sm: 12, md: 13, lg: 18 } }}>
                    Seconds Left: <b>{timeLeft.toFixed(1)}s</b>
                </Mui.Typography>

                <Mui.LinearProgress variant='determinate' value={(timeLeft / duration) * 100} sx={{ borderRadius: 5, height: { xs: 3, sm: 5, md: 8, lg: 10 } }} />
            </Mui.Box>


        </Fragment>
    )
}