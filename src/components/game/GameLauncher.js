import * as Mui from '@mui/material'

export default function GameLauncher() {



    return (
        <Mui.Container>
            <h1>Game Launcher</h1>
            <Mui.Paper elevation={5} sx={{ padding: 5, display: 'flex', justifyContent: 'center' }}>
                <Mui.Stack spacing={3} direction='row'>

                    {/* <Mui.Button sx={{ width: 300, height: 300, backgroundImage: 'url(./pexels-dmitry-demidov-3852577.jpg)', filter: 'brightness(40%)' }} variant='outlined'> */}
                    {/* <Mui.Button sx={{ width: 300, height: 300, background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(./pexels-dmitry-demidov-3852577.jpg)' }} variant='outlined'> */}
                    <Mui.Button sx={{ width: 300, height: 300, background: 'url(./pexels-dmitry-demidov-3852577.jpg)', backgroundColor: 'grey', backgroundBlendMode: 'multiply' }} color='secondary' variant='contained'>
                        <Mui.Typography>
                            Standard Mode
                        </Mui.Typography>
                    </Mui.Button>

                    <Mui.Button sx={{ width: 300, height: 300, background: 'url(./pexels-dmitry-demidov-3852577.jpg)', backgroundColor: 'grey', backgroundBlendMode: 'multiply' }} color='secondary' variant='contained'>
                        <Mui.Typography>
                            Specialized Mode
                        </Mui.Typography>
                    </Mui.Button>

                    <Mui.Button sx={{ width: 300, height: 300, background: 'url(./pexels-dmitry-demidov-3852577.jpg)', backgroundColor: 'grey', backgroundBlendMode: 'multiply' }} color='secondary' variant='contained'>
                        <Mui.Typography>
                            Custom Game Mode
                        </Mui.Typography>
                    </Mui.Button>
                </Mui.Stack>
            </Mui.Paper>
        </Mui.Container>
    )
}