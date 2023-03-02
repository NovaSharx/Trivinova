import * as Mui from '@mui/material'

import QuizIcon from '@mui/icons-material/Quiz'
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'

import { Fragment } from 'react'

export default function Home() {

    let title = "TRIVINOVA"
    let titleArray = title.split('')
    titleArray.splice(6, 1, <LightbulbCircleIcon fontSize='200px' />)

    const renderTitleAnimation = titleArray.map((letter, index) => {
        return (
            <Mui.Grow key={index} in timeout={index * 500 + 1000}>
                <Mui.Typography fontSize={200} color='white'>
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
                height: '800px',
                backgroundImage: 'url(pexels-dmitry-demidov-3852577.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backgroundBlendMode: 'multiply',
            }}>

                <Mui.Stack spacing={10} direction='row' sx={{ justifyContent: 'center' }}>
                    {renderTitleAnimation}
                </Mui.Stack>

            </Mui.Box>

            <Mui.Button href='/gamelauncher' variant='contained' sx={{ height: '100px', width: '500px', fontSize: '40px', marginTop: '80px' }}>
                <QuizIcon sx={{ fontSize: '50px' }} /> GAME LAUNCHER <QuizIcon sx={{ fontSize: '50px' }} />
            </Mui.Button>

        </Fragment >
    )
}