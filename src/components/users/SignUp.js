import * as Mui from '@mui/material'

import LockOpenIcon from '@mui/icons-material/LockOpen';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useTheme } from '@emotion/react';
import { useState } from 'react';

import axios from 'axios';

export default function SignUp() {

    const theme = useTheme()

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: ''
    })

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const handlePasswordVisibility = () => {
        if (passwordVisibility) {
            setPasswordVisibility(false)
        } else {
            setPasswordVisibility(true)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = await axios.post('http://localhost:5000/users', userDetails)
            .catch(error => {
                console.log(error) // *** PLACEHOLDER ***
            })
        console.log(user.data)
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