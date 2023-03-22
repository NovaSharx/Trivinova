import * as Mui from '@mui/material'

import QuizIcon from '@mui/icons-material/Quiz'
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'

import { Fragment } from 'react'

import { useNavigate } from "react-router-dom"

export default function Home() {

    const navigate = useNavigate()

    let title = "TRIVINOVA"
    let titleArray = title.split('')
    titleArray.splice(6, 1, <LightbulbCircleIcon sx={{ fontSize: '185px' }} />) // Parse the lightbulb icon in place of the 'O' in the title

    // Title with grow animation
    const renderTitleAnimation = titleArray.map((letter, index) => {
        return (
            <Mui.Grow key={index} in timeout={index * 500 + 1000}>
                <Mui.Typography fontSize={'200px'} color='white' sx={{ display: 'flex', alignItems: 'center' }}>
                    {letter}
                </Mui.Typography>
            </Mui.Grow>
        )
    })

    return (
        <Fragment>
            <Mui.Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'inherit',
                height: '600px',
            }}>

                <Mui.Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    {renderTitleAnimation}
                </Mui.Box>

            </Mui.Box>

            <Mui.Button onClick={() => navigate("/gamelauncher")} variant='contained' sx={{ height: '100px', width: '500px', fontSize: '40px', marginTop: '20px' }}>
                <QuizIcon sx={{ fontSize: '50px' }} /> GAME LAUNCHER <QuizIcon sx={{ fontSize: '50px' }} />
            </Mui.Button>

        </Fragment >
    )
}