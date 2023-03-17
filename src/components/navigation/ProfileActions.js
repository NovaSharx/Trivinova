import * as Mui from '@mui/material'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom'
import { Fragment, useState } from 'react'

export default function ProfileActions(props) {

    const { currentUser } = props

    const navigate = useNavigate()

    const [anchorElement, setAnchorElement] = useState(null)
    const menuOpen = Boolean(anchorElement)

    const handleMenuOpen = (event) => {
        setAnchorElement(event.currentTarget)
    }
    const handleMenuClose = () => {
        setAnchorElement(null)
    }
    const handleLogout = () => {
        navigate("/")
        localStorage.removeItem('token')
        window.location.reload(false) // Reloads the page using the version of the page cached by the browser.
    }

    if (currentUser) {
        if (currentUser.defaultName) {
            return (
                <Mui.Stack direction='row' spacing={1}>
                    <Mui.Button onClick={() => navigate("/login")} variant='outlined' color='inherit'>
                        Login
                    </Mui.Button>

                    <Mui.Button onClick={() => navigate("/signup")} variant='contained' color='secondary'>
                        Sign Up
                    </Mui.Button>
                </Mui.Stack>
            )
        } else {
            return (
                <Fragment>
                    <Mui.Typography>Welcome, {currentUser.userName}</Mui.Typography>

                    <Mui.IconButton onClick={handleMenuOpen}>
                        <AccountCircleIcon fontSize='large' sx={{ color: 'white' }} />
                    </Mui.IconButton>

                    <Mui.Menu
                        anchorEl={anchorElement}
                        open={menuOpen}
                        onClose={handleMenuClose}
                    >
                        <Mui.MenuList>

                            <Mui.MenuItem onClick={handleMenuClose}>
                                <Mui.ListItemIcon>
                                    <PersonIcon />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText>
                                    View Profile
                                </Mui.ListItemText>
                            </Mui.MenuItem>

                            <Mui.MenuItem onClick={handleMenuClose}>
                                <Mui.ListItemIcon>
                                    <ManageAccountsIcon />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText>
                                    Account Settings
                                </Mui.ListItemText>
                            </Mui.MenuItem>

                            <Mui.Divider />

                            <Mui.MenuItem onClick={handleLogout}>
                                <Mui.ListItemIcon>
                                    <LogoutIcon />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText>
                                    Logout
                                </Mui.ListItemText>
                            </Mui.MenuItem>

                        </Mui.MenuList>
                    </Mui.Menu>
                </Fragment>

            )
        }
    }

    return (
        <Mui.Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CircularProgress color='inherit' />
        </Mui.Grid>
    )
}