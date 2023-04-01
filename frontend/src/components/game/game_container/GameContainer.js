import * as Mui from '@mui/material';

import { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import GameTimer from './GameTimer';

export default function GameContainer(props) {

    const triviaQuestions = props.triviaAPIData.result.read() // Reads and stores trivia questions once it loads
    const triviaSettings = props.triviaSettings // Stores trivia settings passed at game launcher

    const navigate = useNavigate()

    let [questionIndex, setQuestionIndex] = useState(0) // Stores the index of the current question being prompted
    let [shuffledAnswers, setShuffledAnswers] = useState([]) // Stores an array of the current possible answers in a random order
    let [timeTaken, setTimeTaken] = useState(0) // Stores the amount of time it took to answer the current question
    let [postGameData, setPostGameData] = useState([]) // Stores the accumulation of results for each previous question

    // !!!!!!!!!!!!!!!!! React Hook useEffect has missing dependencies: 'navigate', 'postGameData', 'shuffleAnswers', 'triviaQuestions.length', and 'triviaSettings'. Either include them or remove the dependency array  react-hooks/exhaustive-deps!!!
    // Triggers once current question index has changed and either shuffles new presented answers if more questions exist or routes to post game while passing trivia settings and post game results if question index has exceeded question limit.
    useEffect(() => {
        if (questionIndex < triviaQuestions.length) {
            shuffleAnswers()
        } else {
            navigate('/postgame', {
                state: {
                    triviaSettings,
                    postGameData
                }
            })
        }
    }, [questionIndex])

    // Shuffle the order of the elements in the answers array and pass them to shuffledAnswers state variable
    const shuffleAnswers = () => {
        let answers = [triviaQuestions[questionIndex].correctAnswer, ...triviaQuestions[questionIndex].incorrectAnswers] // Stores an array of the four possible answers
        let currentIndex = answers.length
        let randomIndex

        // Shuffle logic
        while (currentIndex !== 0) {
            // Choose a random answer from the array
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex-- //decrement current index

            // Swap the random element wirth the current element
            [answers[currentIndex], answers[randomIndex]] = [answers[randomIndex], answers[currentIndex]]
        }

        setShuffledAnswers(answers)
    }

    // Renders shuffled answers
    const renderAnswers = shuffledAnswers.map((answer, index) => {
        return (
            <Fragment key={index}>
                {questionIndex < triviaQuestions.length &&
                    <Mui.Grid item xs={6}>
                        <Mui.Button variant='contained' onClick={() => checkAnswer(answer)} fullWidth>
                            {answer}
                        </Mui.Button>
                    </Mui.Grid>}
            </Fragment>
        )
    })

    // Checks if user got question right or wrong, accumulates result data and increments the question index
    const checkAnswer = (selection) => {
        let gotCorrect = false

        if (selection === triviaQuestions[questionIndex].correctAnswer) {
            gotCorrect = true
        }

        const questionResults = {
            id: triviaQuestions[questionIndex].id,
            question: triviaQuestions[questionIndex].question,
            selection: selection,
            answer: triviaQuestions[questionIndex].correctAnswer,
            timeTaken,
            gotCorrect
        }

        setPostGameData([...postGameData, questionResults])
        setQuestionIndex(questionIndex + 1)
    }

    return (
        <Mui.Paper elevation={5} sx={{ p: 2 }}>

            <Mui.Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
            }}>

                <Mui.Button onClick={() => navigate("/gamelauncher")} variant='outlined'>
                    Game Launcher
                </Mui.Button>

                <Mui.Button onClick={() => navigate("/")} variant='outlined'>
                    Main Menu
                </Mui.Button>

            </Mui.Box>

            <Mui.Paper variant='outlined' sx={{ m: 2, p: 2 }}>

                {questionIndex < triviaQuestions.length && <Mui.Typography variant='h3'> {questionIndex + 1}.  {triviaQuestions[questionIndex].question} </Mui.Typography>}

                <GameTimer key={questionIndex} checkAnswer={checkAnswer} setTimeTaken={setTimeTaken} />

                <Mui.Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>

                    {renderAnswers}

                </Mui.Grid>
            </Mui.Paper>
        </Mui.Paper>
    )
}