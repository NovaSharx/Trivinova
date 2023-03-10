import * as Mui from '@mui/material'

import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

export default function PostGame() {

    const location = useLocation()
    const { postGameData, triviaSettings } = location.state
    console.log(postGameData)

    const renderResults = postGameData.map((result, index) => {
        return (
            <Mui.Zoom key={index} in={true} style={{ transitionDelay: true && `${200 * index}ms` }}>
                <Mui.Grid item xs={12}>
                    <Mui.Paper elevation={8} sx={{ borderRadius: 3, border: result.gotCorrect ? 'solid 3px rgba(47,154,47,1)' : 'solid 3px rgba(255,0,0,1)' }}>

                        <Mui.Typography bgcolor={result.gotCorrect ? 'rgb(47,154,47)' : 'rgb(255,0,0)'} color='white'>{index + 1}.  {result.question}</Mui.Typography>

                        <Mui.Box sx={{ p: 1 }}>
                            <Mui.Typography>Selection: <b>{result.selection}</b></Mui.Typography>
                            <Mui.Typography>Answer: <b>{result.answer}</b></Mui.Typography>
                            <Mui.Typography>Answered In: <b>{result.timeTaken} second(s)</b></Mui.Typography>
                        </Mui.Box>
                    </Mui.Paper>
                </Mui.Grid>
            </Mui.Zoom >
        )
    })

    const calculateScore = () => {
        let playerScore = 0

        postGameData.forEach(result => {
            if (result.gotCorrect) {
                playerScore += (30 - result.timeTaken) * 100
            }
        })
        return playerScore
    }

    return (
        <Mui.Container component='main' maxWidth='xl'>
            <Mui.Box elevation={5} sx={{
                mt: 10,
                p: 2,
                borderRadius: 3,
                background: 'rgba(0,0,0,0.15)',
                backdropFilter: 'blur(5px)'
            }}>

                <Mui.Button href='/gamelauncher' variant='contained'>
                    Play Again
                </Mui.Button>

                <Mui.Typography variant='h3'>Score: {calculateScore()} points</Mui.Typography>

                <Mui.Box sx={{ p: 3 }}>
                    <Mui.Grid container direction='row' spacing={{ xs: 1, sm: 2, md: 3 }}>

                        {renderResults}

                    </Mui.Grid>
                </Mui.Box>

            </Mui.Box>
        </Mui.Container>
    )
}