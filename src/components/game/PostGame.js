import * as Mui from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';

import { useState, useEffect, Suspense, Fragment } from 'react'
import { useLocation } from 'react-router-dom'

import axios from 'axios'
import { promiseSuspender } from '../../promiseSuspender'

export default function PostGame() {

    const location = useLocation()
    const postGameData = location.state
    console.log(postGameData)

    return (
        <Fragment>

            <Mui.Button href='/gamelauncher'>
                Play Again
            </Mui.Button>

            <h1>POST GAME</h1>
        </Fragment>
    )
}