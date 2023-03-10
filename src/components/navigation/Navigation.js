import * as Mui from '@mui/material'

import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle'

import MenuDrawer from './MenuDrawer'

export default function Navigation() {

    return (
        <div>
            <Mui.AppBar position='static'>
                <Mui.Container maxWidth='x1'>
                    <Mui.Toolbar disableGutters>

                        <Mui.Grid container direction='row' alignItems='center' justifyContent='space-between'>

                            <Mui.Grid item xs={4} sx={{ display: 'flex' }}>
                                <MenuDrawer />
                            </Mui.Grid>

                            <Mui.Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Mui.Link href='/' underline='none' color='inherit'>
                                    <Mui.Typography variant='h4' sx={{ display: 'flex', alignItems: 'center' }}>
                                        TRIVIN<LightbulbCircleIcon sx={{ fontSize: 32 }} />VA
                                    </Mui.Typography>
                                </Mui.Link>
                            </Mui.Grid>

                            <Mui.Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Mui.Stack direction='row' spacing={1}>
                                    <Mui.Button href='/login' variant='outlined' color='inherit'>
                                        Login
                                    </Mui.Button>

                                    <Mui.Button href='/signup' variant='contained' color='secondary'>
                                        Sign Up
                                    </Mui.Button>
                                </Mui.Stack>
                            </Mui.Grid>

                        </Mui.Grid>

                    </Mui.Toolbar>
                </Mui.Container>
            </Mui.AppBar>
        </div >
    )
}