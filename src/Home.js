import * as Mui from '@mui/material'

import QuizIcon from '@mui/icons-material/Quiz'
import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'

import { Fragment } from 'react'

export default function Home() {

    let title = "TRIVINOVA"
    let titleArray = title.split('')
    titleArray.splice(6, 1, <LightbulbCircleIcon sx={{ fontSize: '185px' }} />)

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

            <Mui.Button href='/gamelauncher' variant='contained' sx={{ height: '100px', width: '500px', fontSize: '40px', marginTop: '200px' }}>
                <QuizIcon sx={{ fontSize: '50px' }} /> GAME LAUNCHER <QuizIcon sx={{ fontSize: '50px' }} />
            </Mui.Button>

        </Fragment >
    )
}