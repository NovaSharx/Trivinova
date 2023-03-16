import * as Mui from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useTheme } from '@emotion/react'
import { useState } from 'react'

export default function Login() {

    const theme = useTheme()

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const handlePasswordVisibility = () => {
        if (passwordVisibility) {
            setPasswordVisibility(false)
        } else {
            setPasswordVisibility(true)
        }
    }

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

                <Mui.Box component='form' onSubmit={() => { }} sx={{
                    p: 3,
                    borderRadius: 2,
                    background: theme.palette.background.paper,
                }}>
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
                                type={passwordVisibility ? 'text' : 'password'}
                                id='password'
                                label='Password'
                                placeholder={passwordVisibility ? 'Enter Password' : '**********'}
                                required
                                fullWidth
                                autoComplete='current-password'
                                InputProps={{
                                    endAdornment: (
                                        <Mui.InputAdornment position='end'>
                                            <Mui.IconButton onClick={handlePasswordVisibility}>
                                                {passwordVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </Mui.IconButton>
                                        </Mui.InputAdornment>
                                    )
                                }}
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