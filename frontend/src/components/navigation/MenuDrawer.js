import * as Mui from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import MenuIcon from '@mui/icons-material/Menu'

import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MenuDrawer() {

    const navigate = useNavigate()

    const [drawerState, setDrawerState] = useState(false)

    return (
        <Fragment>

            <Mui.IconButton color='inherit' onClick={() => setDrawerState(true)}>
                <MenuIcon sx={{ fontSize: { xs: 25, sm: 32 } }} />
            </Mui.IconButton>
            <Mui.Drawer anchor='left' open={drawerState} onClose={() => setDrawerState(false)}>
                <Mui.Box sx={{ width: 300 }}>
                    <Mui.List>

                        <Mui.Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}>
                            <Mui.IconButton onClick={() => setDrawerState(false)}>
                                <ArrowBackIcon fontSize='large' />
                            </Mui.IconButton>
                        </Mui.Box>

                        <Mui.Divider />

                        <Mui.ListItem disablePadding>
                            <Mui.ListItemButton onClick={() => { navigate('/searchplayer'); setDrawerState(false) }}>
                                <Mui.ListItemIcon>
                                    <PersonSearchIcon />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText primary='Search Player' />
                            </Mui.ListItemButton>
                        </Mui.ListItem>

                        <Mui.ListItem disablePadding>
                            <Mui.ListItemButton onClick={() => { navigate('/leaderboards'); setDrawerState(false) }}>
                                <Mui.ListItemIcon>
                                    <LeaderboardIcon />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText primary='Leaderboards' />
                            </Mui.ListItemButton>
                        </Mui.ListItem>

                    </Mui.List>
                </Mui.Box>
            </Mui.Drawer>

        </Fragment>
    )
}