import * as Mui from '@mui/material'

import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'
import CloseIcon from '@mui/icons-material/Close'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react';

export default function Navigation() {

    let [drawerState, setDrawerState] = useState(false)

    return (
        <div>
            <Mui.AppBar position='static'>
                <Mui.Container maxWidth='x1'>
                    <Mui.Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

                        <Mui.IconButton color='inherit' onClick={() => setDrawerState(true)}>
                            <MenuIcon fontSize='large' />
                        </Mui.IconButton>
                        <Mui.Drawer anchor='left' open={drawerState} onClose={() => setDrawerState(false)}>
                            <Mui.Box sx={{ width: 300 }}>
                                <Mui.List>

                                    <Mui.Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Mui.IconButton onClick={() => setDrawerState(false)}>
                                            <CloseIcon fontSize='large' />
                                        </Mui.IconButton>
                                    </Mui.Box>

                                    <Mui.Divider />

                                    <Mui.ListItem disablePadding>
                                        <Mui.ListItemButton href='/searchplayer'>
                                            <Mui.ListItemIcon>
                                                <PersonSearchIcon />
                                            </Mui.ListItemIcon>
                                            <Mui.ListItemText primary='Search Player' />
                                        </Mui.ListItemButton>
                                    </Mui.ListItem>

                                    <Mui.ListItem disablePadding>
                                        <Mui.ListItemButton href='/leaderboards'>
                                            <Mui.ListItemIcon>
                                                <LeaderboardIcon />
                                            </Mui.ListItemIcon>
                                            <Mui.ListItemText primary='Leaderboards' />
                                        </Mui.ListItemButton>
                                    </Mui.ListItem>

                                </Mui.List>
                            </Mui.Box>
                        </Mui.Drawer>

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