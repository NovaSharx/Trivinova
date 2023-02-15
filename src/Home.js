import * as Mui from '@mui/material'

import QuizIcon from '@mui/icons-material/Quiz';

export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Mui.Button href='/gamelauncher' variant='contained' size='large' endIcon={<QuizIcon />}>
                GAME LAUNCHER
            </Mui.Button>
        </div>
    )
}