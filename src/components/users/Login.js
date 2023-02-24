import * as Mui from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'

export default function Login() {

    return (
        <Mui.Container component='main' maxWidth='xs'>

            <Mui.Box sx={{
                mt: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <Mui.Avatar sx={{
                    bgcolor: 'secondary.main',
                    m: 1,
                    width: '60px',
                    height: '60px'
                }}>
                    <PersonIcon sx={{ fontSize: '50px' }} />
                </Mui.Avatar>

                <Mui.Typography variant='h4' m={2}>
                    Login
                </Mui.Typography>

                <Mui.Box component='form' onSubmit={() => { }}>
                    <Mui.Grid container spacing={2} justifyContent='center'>

                        <Mui.Grid item xs={12}>
                            <Mui.TextField
                                name='username'
                                id='username'
                                label='Username'
                                required
                                fullWidth
                                autoFocus
                                autoComplete='username'
                            // inputProps={{ pattern: '/^[a-zA-Z0-9]+$/' }}
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.TextField
                                name='password'
                                type='password'
                                id='password'
                                label='Password'
                                placeholder='**********'
                                required
                                fullWidth
                                autoComplete='current-password'
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.Button variant='contained' size='large' fullWidth type='submit'>Log in</Mui.Button>
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.Typography>
                                <Mui.Link href='/signup'>Don't have an account? Sign Up.</Mui.Link>
                            </Mui.Typography>
                        </Mui.Grid>

                    </Mui.Grid>


                </Mui.Box>

            </Mui.Box>

        </Mui.Container>
    )
}