import * as Mui from '@mui/material'

import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'

import { useNavigate } from "react-router-dom"

export default function Home() {

    const navigate = useNavigate()

    let title = "TRIVINOVA"
    let titleArray = title.split('')
    titleArray.splice(6, 1, <LightbulbCircleIcon sx={{ fontSize: { xs: 50, sm: 80, md: 100, lg: 120, xl: 150 } }} />) // Parse the lightbulb icon in place of the 'O' in the title

    // Title with grow animation
    const renderTitleAnimation = titleArray.map((letter, index) => {
        return (
            <Mui.Grow key={index} in timeout={index * 500 + 1000}>
                <Mui.Typography fontWeight={200} color='white'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: { xs: 50, sm: 80, md: 100, lg: 120, xl: 150 }
                    }}>
                    {letter}
                </Mui.Typography>
            </Mui.Grow>
        )
    })

    return (
        <Mui.Box sx={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
        }}>

            <Mui.Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', overflowX: 'hidden' }}>
                {renderTitleAnimation}
            </Mui.Box>

            <Mui.Button onClick={() => navigate("/gamelauncher")} variant='contained'
                sx={{
                    py: 2,
                    px: 5,
                    fontSize: { xs: 20, sm: 25, md: 30, lg: 35 },
                    fontWeight: 300
                }}>
                start trivia
            </Mui.Button>

        </Mui.Box >
    )
}