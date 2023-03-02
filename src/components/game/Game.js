import * as Mui from '@mui/material'
import { useLocation, useParams } from 'react-router-dom'

export default function Game() {

    const { gamemode } = useParams()
    const location = useLocation()

    return (
        <>
            <h1>Game</h1>
            <Mui.Button href='/gamelauncher' variant='contained'>
                Back to Game Launcher
            </Mui.Button>
            <h2>{gamemode}</h2>
            {console.log(location.state)}
        </>
    )
}