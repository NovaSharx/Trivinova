import * as Mui from '@mui/material'

import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useTheme } from '@emotion/react';

export default function SignUp() {

    const theme = useTheme()

    return (
        <Mui.Container component='main' maxWidth='sm'>

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
                    <LockOpenIcon sx={{ fontSize: '50px' }} />
                </Mui.Avatar>

                <Mui.Typography variant='h4' m={2}>
                    Sign Up
                </Mui.Typography>

                <Mui.Box component='form' onSubmit={() => { }} sx={{
                    p: 3,
                    borderRadius: 2,
                    background: theme.palette.background.paper,
                }}>
                    <Mui.Grid container spacing={2} justifyContent='center'>

                        <Mui.Grid item xs={6}>
                            <Mui.TextField
                                name='firstname'
                                id='firstname'
                                label='First Name'
                                required
                                fullWidth
                                autoFocus
                                autoComplete='given-name'
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={6}>
                            <Mui.TextField
                                name='lastname'
                                id='lastname'
                                label='Last Name'
                                required
                                fullWidth
                                autoComplete='family-name'
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.TextField
                                name='username'
                                id='username'
                                label='Username'
                                required
                                fullWidth
                                autoComplete='username'
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.TextField
                                name='password'
                                type='password'
                                id='password'
                                label='Password'
                                required
                                fullWidth
                                autoComplete='new-password'
                            />
                        </Mui.Grid>

                        {/* Add confirm password input */}

                        <Mui.Grid item xs={12}>
                            <Mui.Button variant='contained' size='large' fullWidth type='submit'>Sign Up</Mui.Button>
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.Typography>
                                <Mui.Link href='/login'>Already have an account? Log in.</Mui.Link>
                            </Mui.Typography>
                        </Mui.Grid>

                    </Mui.Grid>

                </Mui.Box>

            </Mui.Box>

        </Mui.Container>
    )
}