import * as Mui from '@mui/material'

import { Fragment, useState } from 'react'

export default function GameTimer(props) {

    const { checkAnswer, setTimeTaken } = props

    const duration = 30

    let [startTime, setStartTime] = useState(Date.now() + 1000 * duration)
    let [timeLeft, setTimeLeft] = useState(duration)
    let [timeoutId, setTimeoutId] = useState()

    const countdown = () => {
        if (timeLeft < 0) return

        let timeout = setTimeout(() => {
            setTimeoutId(timeout)

            const millisecondsLeft = startTime - Date.now()
            setTimeLeft(millisecondsLeft / 1000)
            setTimeTaken((duration - (millisecondsLeft / 1000)).toFixed(2))

            if (millisecondsLeft < 0) {
                endTimer()
            }
        })
    }

    const endTimer = () => {
        clearTimeout(timeoutId)
        checkAnswer('')
    }

    countdown()

    return (
        <Fragment>
            <Mui.Box sx={{ m: 3 }}>
                <Mui.Typography variant='h6'>Seconds Left: <b>{timeLeft.toFixed(1)}s</b></Mui.Typography>

                <Mui.LinearProgress variant='determinate' value={Math.round(timeLeft / duration) * 100} sx={{ borderRadius: '5px', height: '10px' }} />
            </Mui.Box>


        </Fragment>
    )
}