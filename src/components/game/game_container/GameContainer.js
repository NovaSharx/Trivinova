import * as Mui from '@mui/material'
import { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import GameTimer from './GameTimer'

export default function GameContainer(props) {

    const triviaQuestions = props.triviaAPIData.result.read()
    const triviaSettings = props.triviaSettings

    const navigate = useNavigate()

    let [questionIndex, setQuestionIndex] = useState(0)
    let [shuffledAnswers, setShuffledAnswers] = useState([])
    let [timeTaken, setTimeTaken] = useState(0)
    let [postGameData, setPostGameData] = useState([])

    useEffect(() => {
        if (questionIndex < testQuestions.length) {
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


    // Shuffle the order of the elements in the answers array.
    const shuffleAnswers = () => {
        let answers = [testQuestions[questionIndex].correctAnswer, ...testQuestions[questionIndex].incorrectAnswers] // Stores an array of the four possible answers
        let currentIndex = answers.length
        let randomIndex

        // Shuffle logic
        while (currentIndex !== 0) {
            // Choose a random answer from the array.
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex-- //decrement current index.

            // Swap the random element wirth the current element.
            [answers[currentIndex], answers[randomIndex]] = [answers[randomIndex], answers[currentIndex]]
        }

        setShuffledAnswers(answers)
    }

    const renderAnswers = shuffledAnswers.map((answer, index) => {
        return (
            <Fragment key={index}>
                {questionIndex < testQuestions.length &&
                    <Mui.Grid item xs={6}>
                        <Mui.Button variant={answer === testQuestions[questionIndex].correctAnswer ? 'outlined' : 'contained'} onClick={() => checkAnswer(answer)} fullWidth>
                            {answer}
                        </Mui.Button>
                    </Mui.Grid>}
            </Fragment>
        )
    })

    const checkAnswer = (selection) => {
        let gotCorrect = false

        if (selection === testQuestions[questionIndex].correctAnswer) {
            gotCorrect = true
        }

        const questionResults = {
            id: testQuestions[questionIndex].id,
            question: testQuestions[questionIndex].question,
            selection: selection,
            answer: testQuestions[questionIndex].correctAnswer,
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

                <Mui.Button href='/gamelauncher' variant='outlined'>
                    Game Launcher
                </Mui.Button>

                <Mui.Button href='/' variant='outlined'>
                    Main Menu
                </Mui.Button>

            </Mui.Box>

            <Mui.Paper variant='outlined' sx={{ m: 2, p: 2 }}>

                {questionIndex < testQuestions.length && <Mui.Typography variant='h3'> {questionIndex + 1}.  {testQuestions[questionIndex].question} </Mui.Typography>}

                <GameTimer key={questionIndex} checkAnswer={checkAnswer} setTimeTaken={setTimeTaken} />

                <Mui.Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>

                    {renderAnswers}

                </Mui.Grid>
            </Mui.Paper>
        </Mui.Paper>
    )
}

const testQuestions = [
    {
        "category": "Geography",
        "id": "6233847b62eaad73716a8c0f",
        "correctAnswer": "The Dead Sea",
        "incorrectAnswers": [
            "The Mediterranean Sea",
            "The Philippine Sea",
            "The South China Sea"
        ],
        "question": "What is the saltiest sea in the world?",
        "tags": [
            "bodies_of_water",
            "records",
            "oceans",
            "geography"
        ],
        "type": "Multiple Choice",
        "difficulty": "medium",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "History",
        "id": "62611fab4b176d54800e3d69",
        "correctAnswer": "1943",
        "incorrectAnswers": [
            "1911",
            "1968",
            "1924"
        ],
        "question": "When was the first dialysis machine created?",
        "tags": [
            "events",
            "firsts",
            "medicine"
        ],
        "type": "Multiple Choice",
        "difficulty": "hard",
        "regions": [],
        "isNiche": false
    },
    {
        "category": "Geography",
        "id": "62373fd7cb85f7ce9e949cc1",
        "correctAnswer": "Cabo Verde",
        "incorrectAnswers": [
            "Samoa",
            "Albania",
            "Monaco"
        ],
        "question": "Praia is the capital city of which country?",
        "tags": [
            "capital_cities",
            "geography"
        ],
        "type": "Multiple Choice",
        "difficulty": "hard",
        "regions": [],
        "isNiche": false
    }
]