import * as Mui from '@mui/material'

import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useTheme } from '@emotion/react';
import { useContext, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from '../contexts/CurrentUser';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

export default function SignUp() {

    const navigate = useNavigate()

    const theme = useTheme()

    const { setCurrentUser } = useContext(CurrentUser)

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: ''
    })

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const [errorMessage, setErrorMessage] = useState(null) // Stores the error state of the form

    const [isSigningUp, setIsSigningUp] = useState(false) // Stores the state of the sign in button

    const handlePasswordVisibility = () => {
        if (passwordVisibility) {
            setPasswordVisibility(false)
        } else {
            setPasswordVisibility(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setIsSigningUp(true)

        axios.post(`${process.env.REACT_APP_SERVER_URL}users`, userDetails)
            .then(response => {
                console.log(response)
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
                setIsSigningUp(false)
            })
    }

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

                <Mui.Box component='form' onSubmit={handleSubmit} sx={{
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
                                onChange={e => setUserDetails({ ...userDetails, firstName: e.target.value })}
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
                                onChange={e => setUserDetails({ ...userDetails, lastName: e.target.value })}
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.TextField
                                name='email'
                                id='email'
                                label='Email'
                                required
                                fullWidth
                                autoComplete='email'
                                onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.TextField sx={{ mt: 5 }}
                                name='username'
                                id='username'
                                label='Username'
                                required
                                fullWidth
                                autoComplete='username'
                                onChange={e => setUserDetails({ ...userDetails, userName: e.target.value })}
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
                                autoComplete='new-password'
                                InputProps={{
                                    endAdornment: (
                                        <Mui.InputAdornment position='end'>
                                            <Mui.IconButton onClick={handlePasswordVisibility}>
                                                {passwordVisibility ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </Mui.IconButton>
                                        </Mui.InputAdornment>
                                    )
                                }}
                                onChange={e => setUserDetails({ ...userDetails, password: e.target.value })}
                                helperText={errorMessage}
                            />
                            <Mui.TextField sx={{ mt: 1 }}
                                name='confirm-password'
                                type={passwordVisibility ? 'text' : 'password'}
                                id='confirm-password'
                                label='Confirm Password'
                                required
                                fullWidth
                                autoComplete='new-password'
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <LoadingButton
                                variant='contained'
                                size='large'
                                fullWidth
                                type='submit'
                                loading={isSigningUp}
                                loadingIndicator="Creating an account…"
                            >
                                <span>Create An Account</span>
                            </LoadingButton>
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