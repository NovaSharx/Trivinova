import * as Mui from '@mui/material'

import { Fragment } from 'react'
import { useLocation } from 'react-router-dom'

export default function PostGame() {

    const location = useLocation()
    const postGameData = location.state
    console.log(postGameData)

    return (
        <Fragment>

            <Mui.Container component='main' maxWidth='lg'>
                <Mui.Paper elevation={5}>

                    <h1>POST GAME</h1>

                    <Mui.Button href='/gamelauncher' variant='contained'>
                        Play Again
                    </Mui.Button>

                </Mui.Paper>
            </Mui.Container>

        </Fragment>
    )
}