import * as Mui from '@mui/material'

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
                <Mui.Typography fontSize='200px' fontWeight={200} color='white' sx={{ display: 'flex', alignItems: 'center' }}>
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

            <Mui.Button onClick={() => navigate("/gamelauncher")} variant='contained' sx={{ height: '100px', width: '500px', fontSize: '50px', fontWeight: 300, marginTop: '50px' }}>
                start trivia
            </Mui.Button>

        </Fragment >
    )
}