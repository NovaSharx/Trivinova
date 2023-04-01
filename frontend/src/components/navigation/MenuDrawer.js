import * as Mui from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import MenuIcon from '@mui/icons-material/Menu'

import { Fragment, useState } from 'react'

export default function MenuDrawer() {

    let [drawerState, setDrawerState] = useState(false)

    return (
        <Fragment>

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
                                <ArrowBackIcon fontSize='large' />
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

        </Fragment>
    )
}