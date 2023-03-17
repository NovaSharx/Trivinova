import * as Mui from '@mui/material'

import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import MenuDrawer from './MenuDrawer'
import { useContext } from 'react'
import { CurrentUser } from '../contexts/CurrentUser'
import { useNavigate } from 'react-router-dom';

export default function Navigation() {

    const { currentUser } = useContext(CurrentUser)

    const navigate = useNavigate()

    let profileActions = <Mui.Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}></Mui.Grid>

    if (currentUser) {
        if (currentUser.defaultName) {
            profileActions = (
                <Mui.Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Mui.Stack direction='row' spacing={1}>
                        <Mui.Button onClick={() => navigate("/login")} variant='outlined' color='inherit'>
                            Login
                        </Mui.Button>

                        <Mui.Button onClick={() => navigate("/signup")} variant='contained' color='secondary'>
                            Sign Up
                        </Mui.Button>
                    </Mui.Stack>
                </Mui.Grid>
            )
        } else {
            profileActions = (
                <Mui.Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Mui.Typography>Welcome, {currentUser.userName}</Mui.Typography>
                    <Mui.IconButton>
                        <AccountCircleIcon fontSize='large' sx={{ color: 'white' }} />
                    </Mui.IconButton>
                </Mui.Grid>
            )
        }
    }

    return (
        <div>
            <Mui.AppBar position='static'>
                <Mui.Container maxWidth='x1'>
                    <Mui.Toolbar disableGutters>

                        <Mui.Grid container direction='row' alignItems='center' justifyContent='space-between'>

                            <Mui.Grid item xs={5} sx={{ display: 'flex' }}>
                                <MenuDrawer />
                            </Mui.Grid>

                            <Mui.Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Mui.Link component='button' onClick={() => navigate("/")} underline='none' color='inherit'>
                                    <Mui.Typography variant='h4' sx={{ display: 'flex', alignItems: 'center' }}>
                                        TRIVIN<LightbulbCircleIcon sx={{ fontSize: 32 }} />VA
                                    </Mui.Typography>
                                </Mui.Link>
                            </Mui.Grid>

                            {profileActions}

                        </Mui.Grid>

                    </Mui.Toolbar>
                </Mui.Container>
            </Mui.AppBar>
        </div >
    )
}