import * as Mui from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';

import { useContext, useState } from 'react';

import { CurrentUser } from "../contexts/CurrentUser";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate()

    const { setCurrentUser } = useContext(CurrentUser)

    // Stores the entered user credentials
    const [userCredentials, setUserCredentials] = useState({
        userName: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState(null) // Stores the error state of the form

    const [isLoggingIn, setIsLoggingIn] = useState(false) // Stores the state of the login button

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsLoggingIn(true)

        axios.post(`${process.env.REACT_APP_SERVER_URL}authentication`, userCredentials)
            .then(response => {
                localStorage.setItem('token', response.data.token)
                setCurrentUser(response.data.user)
                navigate("/")
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

                <Mui.Paper component='form' onSubmit={handleSubmit} sx={{
                    p: 3,
                    borderRadius: 2,
                }}>
                    <Mui.Grid container spacing={2} justifyContent='center'>

                        <Mui.Grid item xs={12}>
                            <Mui.Typography variant='h4'>
                                LOGIN
                            </Mui.Typography>
                        </Mui.Grid>


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
                                inputProps={{ pattern: '^[A-Za-z][A-Za-z0-9_]{2,15}$' }}
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
                                inputProps={{
                                    pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$'
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

                </Mui.Paper>

            </Mui.Box>

        </Mui.Container>
    )
}