import * as Mui from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';

import { useTheme } from '@emotion/react'
import { useContext, useState } from 'react'

import { CurrentUser } from "../contexts/CurrentUser"
import axios from 'axios';

export default function Login() {

    const theme = useTheme()

    const { setCurrentUser } = useContext(CurrentUser)

    const [userCredentials, setUserCredentials] = useState({
        userName: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState(null)

    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoggingIn(true)

        axios.post('http://localhost:5000/authentication', userCredentials)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                setCurrentUser(response.data.user)
            })
            .catch(error => {
                if (error.response) {
                    setErrorMessage(error.response.data.message)
                } else {
                    setErrorMessage(error.message)
                }
            })
            .finally(() => {
                setIsLoggingIn(false)
            })
    }

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const handlePasswordVisibility = () => {
        if (passwordVisibility) {
            setPasswordVisibility(false)
        } else {
            setPasswordVisibility(true)
        }
    }

    const handleInputFieldChange = (credentials) => {
        errorMessage && setErrorMessage(null)
        setUserCredentials(credentials)
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

                <Mui.Box component='form' onSubmit={handleSubmit} sx={{
                    p: 3,
                    borderRadius: 2,
                    background: theme.palette.background.paper,
                }}>
                    <Mui.Grid container spacing={2} justifyContent='center'>

                        <Mui.Grid item xs={12}>
                            <Mui.TextField
                                error={errorMessage != null}
                                name='username'
                                id='username'
                                label='Username'
                                required
                                fullWidth
                                autoFocus
                                autoComplete='username'
                                // inputProps={{ pattern: '/^[a-zA-Z0-9]+$/' }}
                                helperText={errorMessage}
                                onChange={e => handleInputFieldChange({ ...userCredentials, userName: e.target.value })}
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
                                onChange={e => handleInputFieldChange({ ...userCredentials, password: e.target.value })}
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <LoadingButton
                                variant='contained'
                                size='large'
                                fullWidth
                                type='submit'
                                loading={isLoggingIn}
                                loadingIndicator="Logging In…"
                            >
                                <span>Login</span>
                            </LoadingButton>
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