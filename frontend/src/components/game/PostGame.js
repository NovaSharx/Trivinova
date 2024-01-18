import * as Mui from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CurrentUser } from '../contexts/CurrentUser';
import { StatusBar } from '../contexts/StatusBar';
import axios from 'axios';

export default function PostGame() {

    const navigate = useNavigate()

    const { currentUser } = useContext(CurrentUser)
    const { deployStatusMessage } = useContext(StatusBar)

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

    // Evaluates whether or not an account user has achieved a highscore
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
                    if (error.response) {
                        deployStatusMessage(error.response.data.message, 'error')
                    } else {
                        deployStatusMessage(error.message, 'error')
                    }
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
                            border: result.gotCorrect ? 'solid 0.2rem #46e046' : 'solid 0.2rem #ff0000',
                            backgroundColor: result.gotCorrect ? '#2f9a2f' : '#a70000'
                        }}
                    >

                        <Mui.AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
                            <Mui.Typography color='white' sx={{ fontSize: { xs: 12, sm: 16, md: 20 } }}>{index + 1}.  {result.question}</Mui.Typography>
                        </Mui.AccordionSummary>

                        <Mui.AccordionDetails sx={{ p: 0 }}>
                            <Mui.Box sx={{ p: 1, backgroundColor: 'white', color: 'black' }}>
                                <Mui.Typography sx={{ fontSize: { xs: 12, sm: 16, md: 20 } }}>Selection: <b>{result.selection}</b></Mui.Typography>
                                <Mui.Typography sx={{ fontSize: { xs: 12, sm: 16, md: 20 } }}>Answer: <b>{result.answer}</b></Mui.Typography>
                                <Mui.Typography sx={{ fontSize: { xs: 12, sm: 16, md: 20 } }}>Answered In: <b>{result.timeTaken} second(s)</b></Mui.Typography>
                            </Mui.Box>
                        </Mui.AccordionDetails>

                    </Mui.Accordion>
                </Mui.Grid>
            </Mui.Zoom >
        )
    })

    // Renders post game options depending on a user has an account or not
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
                    <Mui.Typography sx={{ fontSize: { xs: 12, sm: 16, md: 20, lg: 24 }, fontStyle: 'italic' }}>
                        You must <Mui.Link color='inherit' onClick={() => navigate('/login')} sx={{ cursor: 'pointer' }}><b>Login</b></Mui.Link> or <Mui.Link color='inherit' onClick={() => navigate('/signup')} sx={{ cursor: 'pointer' }}><b>Create an account</b></Mui.Link> in order to be placed on the leaderboard
                    </Mui.Typography>
                )
            }
            else {
                return
            }
        }
    }

    // Closes the highscore alert dialog window
    const closeHighscoreDialog = () => {
        setOpenHighscoreDialog(false)
    }

    // Handles the submission of highscore data
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
                deployStatusMessage('Highscore was posted successfully!')
            })
            .catch(error => {
                if (error.response) {
                    deployStatusMessage(error.response.data.message, 'error')
                } else {
                    deployStatusMessage(error.message, 'error')
                }
            })
    }

    return (
        <Mui.Container component='main' maxWidth='lg' sx={{ p: { xs: 2, sm: 3, md: 4, lg: 5 } }}>
            <Mui.Box elevation={5} sx={{
                p: 2,
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
                        my: 3
                    }}>
                        <Mui.Typography sx={{ fontSize: { xs: 10, sm: 13, md: 16 } }}>Game mode: <b>{triviaSettings.gameMode.toUpperCase()}</b></Mui.Typography>
                        <Mui.Typography sx={{ fontSize: { xs: 10, sm: 13, md: 16 } }}>Category: <b>{triviaSettings.category.toUpperCase()}</b></Mui.Typography>
                        <Mui.Typography sx={{ fontSize: { xs: 10, sm: 13, md: 16 } }}>Difficulty: <b>{triviaSettings.difficulty.toUpperCase()}</b></Mui.Typography>
                        <Mui.Typography sx={{ fontSize: { xs: 10, sm: 13, md: 16 } }}>Number of questions: <b>{triviaSettings.limit}</b></Mui.Typography>
                    </Mui.Box>

                    <Mui.Box sx={{
                        my: 3,
                        mx: 'auto',
                        p: 2,
                        width: { sm: 3 / 4 },
                        borderRadius: 3,
                        boxShadow: 'inset 0px 0px 1rem 0.3rem #00000050'
                    }}>
                        <Mui.Typography variant='h2' sx={{ fontSize: { xs: 20, sm: 25, md: 30, lg: 35 } }}>SCORE</Mui.Typography>
                        <Mui.Typography sx={{ fontSize: { xs: 60, sm: 65, md: 70, lg: 75 }, fontWeight: 700 }}>{calculateScore()} </Mui.Typography>

                        {renderhighscoreOptions()}

                    </Mui.Box>
                </Mui.Box>

                <Mui.Box sx={{ p: { sm: 1, md: 2, lg: 3 } }}>
                    <Mui.Grid container direction='row' spacing={{ xs: 1, sm: 2, md: 3 }}>

                        {renderResults}

                    </Mui.Grid>
                </Mui.Box>

            </Mui.Box>
        </Mui.Container>
    )
}