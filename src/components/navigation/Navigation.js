import * as Mui from '@mui/material'

import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import MenuIcon from '@mui/icons-material/Menu'

export default function Navigation() {
    return (
        <div>
            <Mui.AppBar position='static'>
                <Mui.Container maxWidth='x1' sx={{ height: '60px' }}>
                    <Mui.Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

                        <Mui.IconButton color='inherit'>
                            <MenuIcon fontSize='large' />
                        </Mui.IconButton>

                        <Mui.Link href='/' underline='none' color='inherit'>
                            <Mui.Typography variant='h4' sx={{ display: 'flex', alignItems: 'center' }}>
                                TRIVIN<LightbulbCircleIcon sx={{ fontSize: 32 }} />VA
                            </Mui.Typography>
                        </Mui.Link>

                        {/* <Mui.IconButton href='/searchuser' disableRipple>
                            Search User<PersonSearchIcon />
                        </Mui.IconButton>

                        <Mui.IconButton href='/leaderboards' disableRipple>
                            Leaderboards<LeaderboardIcon />
                        </Mui.IconButton> */}

                        <Mui.Box sx={{
                            width: '180px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Mui.Button href='/login' variant='outlined' color='inherit'>
                                Login
                            </Mui.Button>

                            <Mui.Button href='/signup' variant='contained' color='secondary'>
                                Sign Up
                            </Mui.Button>

                        </Mui.Box>
                    </Mui.Toolbar>
                </Mui.Container>
            </Mui.AppBar>
        </div >
    )
}

{/* <div>
    <Mui.AppBar position='static'>
        <Mui.Container maxWidth='x1'>
            <Mui.Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                <Mui.IconButton color='inherit'>
                    <MenuIcon fontSize='large' />
                </Mui.IconButton>
                <Mui.Link href='/' underline='none' color='inherit'>
                    <Mui.Typography variant='h4' sx={{ display: 'flex', alignItems: 'center' }}>
                        TRIVIN<LightbulbCircleIcon sx={{ fontSize: 32 }} />VA
                    </Mui.Typography>
                </Mui.Link>
                <Mui.Box sx={{
                    width: '180px',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Mui.Link href='/login' underline='none' color='inherit'>
                        <Mui.Button variant='outlined' color='inherit'>Login</Mui.Button>
                    </Mui.Link>
                    <Mui.Link href='/signup' underline='none' color='inherit'>
                        <Mui.Button variant='contained' color='secondary'>Sign Up</Mui.Button>
                    </Mui.Link>
                </Mui.Box>
            </Mui.Toolbar>
        </Mui.Container>
    </Mui.AppBar>
</div> */}