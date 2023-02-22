import * as Mui from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'

export default function Login() {

    return (
        <div>
            <h1>Login</h1>
            <Mui.Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Mui.Avatar sx={{
                    bgcolor: 'secondary.main',
                    mx: 'auto',
                    width: '60px',
                    height: '60px'
                }}>
                    <PersonIcon sx={{ fontSize: '50px' }} />
                </Mui.Avatar>

                <Mui.Typography>
                    Login
                </Mui.Typography>

                <Mui.Box component='form' onSubmit={() => { }}>
                    <Mui.Grid container spacing={2} justifyContent='center'>
                        <Mui.Grid item xs={12} sm={6}>
                            <Mui.TextField
                                autoComplete='given-name'
                                name='playerName'
                                id='plaerName'
                                label='firstName'
                                required
                                fullWidth
                            />
                        </Mui.Grid>
                    </Mui.Grid>
                </Mui.Box>
            </Mui.Box>
        </div>
    )
}