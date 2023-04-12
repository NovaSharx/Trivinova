import * as Mui from '@mui/material'

import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'

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
        <Mui.Box sx={{
            width: '100%',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>

            <Mui.Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                {renderTitleAnimation}
            </Mui.Box>

            <Mui.Button onClick={() => navigate("/gamelauncher")} variant='contained' sx={{ height: '100px', width: '500px', fontSize: '50px', fontWeight: 300 }}>
                start trivia
            </Mui.Button>

        </Mui.Box>
    )
}