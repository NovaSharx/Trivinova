import * as Mui from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useLocation, useNavigate } from 'react-router-dom';

export default function PostGame() {

    const navigate = useNavigate()

    const location = useLocation()
    const { postGameData, triviaSettings } = location.state // Destructures post game data and trivia settings passed at game container

    // Renders result data
    const renderResults = postGameData.map((result, index) => {
        return (
            <Mui.Zoom key={index} in={true} style={{ transitionDelay: true && `${200 * index}ms` }}>
                <Mui.Grid item xs={12}>
                    <Mui.Accordion
                        elevation={8}
                        sx={{
                            border: result.gotCorrect ? 'solid 3px #46e046' : 'solid 3px #ff0000',
                            backgroundColor: result.gotCorrect ? '#2f9a2f' : '#a70000'
                        }}
                    >

                        <Mui.AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                            <Mui.Typography color='white'>{index + 1}.  {result.question}</Mui.Typography>
                        </Mui.AccordionSummary>

                        <Mui.AccordionDetails sx={{ p: 0 }}>
                            <Mui.Box sx={{ p: 1, backgroundColor: 'white' }}>
                                <Mui.Typography>Selection: <b>{result.selection}</b></Mui.Typography>
                                <Mui.Typography>Answer: <b>{result.answer}</b></Mui.Typography>
                                <Mui.Typography>Answered In: <b>{result.timeTaken} second(s)</b></Mui.Typography>
                            </Mui.Box>
                        </Mui.AccordionDetails>

                    </Mui.Accordion>
                </Mui.Grid>
            </Mui.Zoom >
        )
    })

    // Calculates and returns the user's average score rounded to a whole number
    const calculateScore = () => {
        let scoreTotal = 0

        // If user's answer was correct then multiply their score by the amount of time remaining when answered and add it to their total
        postGameData.forEach(result => {
            if (result.gotCorrect) {
                scoreTotal += (30 - result.timeTaken) * 1000
            }
        })

        let averagePlayerScore = Math.round(scoreTotal / triviaSettings.limit)

        return averagePlayerScore
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

                <Mui.Button onClick={() => navigate("/gamelauncher")} variant='contained'>
                    Play Again
                </Mui.Button>

                <Mui.Box sx={{
                    m: '10px 30%',
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 'inset 0px 0px 20px 10px #00000050',
                }}>
                    <Mui.Typography variant='h5'>SCORE</Mui.Typography>
                    <Mui.Typography variant='h2' fontWeight={700}>{calculateScore()} </Mui.Typography>
                </Mui.Box>

                <Mui.Box sx={{ p: 3 }}>
                    <Mui.Grid container direction='row' spacing={{ xs: 1, sm: 2, md: 3 }}>

                        {renderResults}

                    </Mui.Grid>
                </Mui.Box>

            </Mui.Box>
        </Mui.Container>
    )
}