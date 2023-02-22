import * as Mui from '@mui/material'

import QuizIcon from '@mui/icons-material/Quiz';

export default function Home() {

    let title = "TRIVINOVA"

    const renderTitleAnimation = title.split('').map((letter, index) => {
        return (
            <Mui.Grow key={index} in timeout={index * 500 + 1000}>
                <Mui.Typography fontSize={150} color='white'>
                    {letter}
                </Mui.Typography>
            </Mui.Grow>
        )
    })

    return (
        <div>
            <Mui.Box sx={{
                width: 'inherit',
                height: '800px',
                backgroundImage: 'url(pexels-dmitry-demidov-3852577.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backgroundBlendMode: 'multiply',
                // color: 'transparent',
                // backgroundClip: 'text'
            }}>

                <Mui.Stack spacing={10} direction='row' sx={{ justifyContent: 'center' }}>
                    {renderTitleAnimation}
                </Mui.Stack>

                <Mui.Button href='/gamelauncher' variant='contained' size='large' endIcon={<QuizIcon />}>
                    GAME LAUNCHER
                </Mui.Button>

            </Mui.Box>
        </div>
    )
}