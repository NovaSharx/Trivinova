import * as Mui from '@mui/material'

import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useContext, useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CurrentUser } from '../contexts/CurrentUser';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

export default function SignUp() {

    const navigate = useNavigate()

    const { setCurrentUser } = useContext(CurrentUser)

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: ''
    })

    const [confirmationPassword, setConfirmationPassword] = useState('')

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const [errorMessage, setErrorMessage] = useState(null) // Stores the error state of the form

    const [isSigningUp, setIsSigningUp] = useState(false) // Stores the state of the sign in button

    useEffect(() => {
        const handlePasswordMatch = () => {
            if (confirmationPassword !== userDetails.password) {
                setErrorMessage('Passwords do not match.')
            }
            else {
                setErrorMessage(null)
            }
        }
        handlePasswordMatch()
    }, [userDetails, confirmationPassword])

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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>

                <Mui.Paper component='form' onSubmit={handleSubmit} sx={{
                    p: 3,
                    borderRadius: 2,
                }}>
                    <Mui.Grid container spacing={2} justifyContent='center'>

                        <Mui.Grid item xs={12}>
                            <Mui.Typography variant='h4'>
                                SIGN UP
                            </Mui.Typography>
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.Avatar sx={{
                                bgcolor: 'secondary.main',
                                margin: '0px auto',
                                width: '60px',
                                height: '60px'
                            }}>
                                <LockOpenIcon sx={{ fontSize: '50px' }} />
                            </Mui.Avatar>
                        </Mui.Grid>

                        <Mui.Grid item xs={6}>
                            <Mui.TextField
                                name='firstname'
                                id='firstname'
                                label='First Name'
                                required
                                fullWidth
                                autoFocus
                                autoComplete='given-name'
                                inputProps={{ pattern: '^[A-Za-z]{2,16}$' }}
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
                                inputProps={{ pattern: '^[A-Za-z]{2,16}$' }}
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
                                inputProps={{ pattern: '[a-z0-9]+@[a-z]+.[a-z]{2,3}' }}
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
                                inputProps={{ pattern: '^[A-Za-z][A-Za-z0-9_]{2,15}$' }}
                                helperText='Username must be 3-16 characters long, alphanumeric and can contain underscores(_).'
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
                                inputProps={{ pattern: '^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$' }}
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
                            />
                            <Mui.TextField sx={{ mt: 1 }}
                                error={errorMessage != null}
                                name='confirm-password'
                                type={passwordVisibility ? 'text' : 'password'}
                                id='confirm-password'
                                label='Confirm Password'
                                required
                                fullWidth
                                autoComplete='new-password'
                                onChange={(e) => setConfirmationPassword(e.target.value)}
                                helperText={errorMessage ? errorMessage : 'Password must be 6-20 characters long. Must include at least one lower-case character, one upper-case character, one number and one special character (!@#$%^&*).'}
                            />
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <LoadingButton
                                disabled={errorMessage !== null}
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

                </Mui.Paper>

            </Mui.Box>

        </Mui.Container>
    )
}