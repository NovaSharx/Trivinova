import * as Mui from '@mui/material'
import { useState } from 'react'

export default function GameContainer(props) {

    const triviaQuestions = props.triviaAPIData.result.read()
    console.log(triviaQuestions)

    let [questionIndex, setQuestionIndex] = useState(0)

    return (
        <Mui.Paper elevation={5} sx={{ p: 2 }}>

            <Mui.Button href='/gamelauncher' variant='outlined'>
                Back to Game Launcher
            </Mui.Button>

            <Mui.Paper variant='outlined' sx={{ m: 2, p: 2 }}>

                <Mui.Typography variant='h3'>{questionIndex + 1}. {testQuestions[questionIndex].question}</Mui.Typography>

                <Mui.Grid container direction='column'>

                    <Mui.Grid item>
                        <Mui.Button variant='contained'>
                            {testQuestions[questionIndex].incorrectAnswers[0]}
                        </Mui.Button>
                    </Mui.Grid>

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