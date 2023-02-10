import * as Mui from '@mui/material'

import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt'
import MenuIcon from '@mui/icons-material/Menu';

export default function Navigation() {
    return (
        <div>
            <Mui.AppBar position='static'>
                <Mui.Container maxWidth='x1'>
                    <Mui.Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Mui.IconButton color='inherit'>
                            <MenuIcon fontSize='large' />
                        </Mui.IconButton>
                        <Mui.Link href='/' underline='none' color='inherit'>
                            <Mui.Typography variant='h4'>
                                TRIN<PsychologyAltIcon fontSize='large' />VIA
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
        </div>
    )
}