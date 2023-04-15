import * as Mui from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CurrentUser } from '../contexts/CurrentUser';
import axios from 'axios';

export default function PostGame() {

    const navigate = useNavigate()

    const { currentUser } = useContext(CurrentUser)

    const location = useLocation()
    const { postGameData, triviaSettings } = location.state // Destructures post game data and trivia settings passed at game container

    const [achievedHighscore, setAchievedHighscore] = useState(false)
    const [openHighscoreDialog, setOpenHighscoreDialog] = useState(false)

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

    if (currentUser && !achievedHighscore) {
        if (currentUser.userId) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}highscores/evaluate`, {
                highscore: calculateScore(),
                gameMode: triviaSettings.gameMode,
            })
                .then(response => {
                    setOpenHighscoreDialog(response.data)
                    setAchievedHighscore(response.data)
                })
                .catch(error => {
                    console.log(error) // ***PlaceHolder***
                })
        }
    }

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
                            <Mui.Box sx={{ p: 1, backgroundColor: 'white', color: 'black' }}>
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

    const renderhighscoreOptions = () => {
        if (currentUser) {
            if (achievedHighscore) {
                return (
                    <Mui.Button onClick={submitHighscore} variant='contained' fullWidth sx={{ mt: 2 }}>
                        Submit Highscore
                    </Mui.Button>
                )
            }
            else if (currentUser.defaultName === 'Guest') {
                return (
                    <Mui.Typography><i><Mui.Link color='inherit' onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }}><b>Login</b></Mui.Link> or <Mui.Link color='inherit' onClick={() => navigate('/signup')} sx={{ cursor: 'pointer' }}><b>Create an account</b></Mui.Link> in order to be placed on the leaderboard</i></Mui.Typography>
                )
            }
            else {
                return
            }
        }
    }

    const closeHighscoreDialog = () => {
        setOpenHighscoreDialog(false)
    }

    const submitHighscore = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}highscores`, {
            userId: currentUser.userId,
            userName: currentUser.userName,
            highscore: calculateScore(),
            gameMode: triviaSettings.gameMode,
            category: triviaSettings.category,
            difficulty: triviaSettings.difficulty,
            limit: triviaSettings.limit,
        })
            .then(() => {
                window.history.replaceState(null, '')
                navigate('/gamelauncher')
            })
            .catch(error => {
                console.log(error) // ***PlaceHolder***
            })
    }

    return (
        <Mui.Container component='main' maxWidth='lg' sx={{ p: 5 }}>
            <Mui.Box elevation={5} sx={{
                pt: 2,
                pb: 2,
                borderRadius: 3,
                background: 'rgba(0,0,0,0.15)',
                backdropFilter: 'blur(10px)'
            }}>

                <Mui.Dialog
                    open={openHighscoreDialog}
                    onClose={closeHighscoreDialog}
                >
                    <Mui.DialogTitle fontSize={30} textAlign='center'><b>HIGHSCORE ACHIEVED</b></Mui.DialogTitle>

                    <Mui.DialogContent>
                        <Mui.DialogContentText textAlign='center'>Click the <b>SUBMIT HIGHSCORE</b> button to place your mark on the leaderboards!</Mui.DialogContentText>
                    </Mui.DialogContent>

                    <Mui.DialogActions>
                        <Mui.Button variant='outlined' onClick={closeHighscoreDialog}>Okay</Mui.Button>
                    </Mui.DialogActions>
                </Mui.Dialog>

                <Mui.Box>
                    <Mui.Button onClick={() => navigate("/gamelauncher")} variant='contained'>
                        Play Again
                    </Mui.Button>

                    <Mui.Box sx={{
                        m: 2,
                    }}>
                        <Mui.Typography>Game mode: <b>{triviaSettings.gameMode.toUpperCase()}</b></Mui.Typography>
                        <Mui.Typography>Category: <b>{triviaSettings.category.toUpperCase()}</b></Mui.Typography>
                        <Mui.Typography>Difficulty: <b>{triviaSettings.difficulty.toUpperCase()}</b></Mui.Typography>
                        <Mui.Typography>Number of questions: <b>{triviaSettings.limit}</b></Mui.Typography>
                    </Mui.Box>

                    <Mui.Box sx={{
                        m: '10px 30%',
                        p: 3,
                        borderRadius: 3,
                        boxShadow: 'inset 0px 0px 15px 5px #00000050'
                    }}>
                        <Mui.Typography variant='h5'>SCORE</Mui.Typography>
                        <Mui.Typography variant='h2' fontWeight={700}>{calculateScore()} </Mui.Typography>

                        {renderhighscoreOptions()}

                    </Mui.Box>
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