import * as Mui from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';
import { Fragment, useState } from 'react';

import { useContext } from 'react';
import { CurrentUser } from '../contexts/CurrentUser';

export default function ProfileActions() {

    const { currentUser } = useContext(CurrentUser) // Calls on the CurrentUser context and destructures current user data from CurrentUserProvider 

    const navigate = useNavigate()

    const [anchorElement, setAnchorElement] = useState(null) // Profile menu anchor
    const menuOpen = Boolean(anchorElement) // Open once the menu anchor has been assigned

    // Opens profile menu
    const handleMenuOpen = (event) => {
        setAnchorElement(event.currentTarget)
    }
    // Closes profile menu
    const handleMenuClose = () => {
        setAnchorElement(null)
    }
    // Logs current user out by removing json web token
    const handleLogout = () => {
        navigate("/login")
        localStorage.removeItem('token')
        window.location.reload(false) // Reloads the page using the version of the page cached by the browser.
    }

    // Render buttons depending on current user
    if (currentUser) {
        // Render login and signup if defaultName exists
        if (currentUser.defaultName) {
            return (

                <Fragment>

                    <Mui.IconButton onClick={handleMenuOpen} size='small'>
                        <PersonOutlineIcon sx={{ color: 'white', fontSize: { xs: 25, sm: 32 } }} />
                    </Mui.IconButton>

                    <Mui.Menu
                        anchorEl={anchorElement}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        sx={{
                            fontSize: { xs: 20, sm: 25, md: 32 }
                        }}
                    >
                        <Mui.MenuList>

                            <Mui.MenuItem divider onClick={() => { navigate("/login"); handleMenuClose() }}>
                                <Mui.ListItemIcon>
                                    <LoginIcon />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText>
                                    Login
                                </Mui.ListItemText>
                            </Mui.MenuItem>

                            <Mui.MenuItem onClick={() => { navigate("/signup"); handleMenuClose() }}>
                                <Mui.ListItemIcon>
                                    <AssignmentIndIcon />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText>
                                    Sign Up
                                </Mui.ListItemText>
                            </Mui.MenuItem>

                        </Mui.MenuList>
                    </Mui.Menu>
                </Fragment>

            )
        }
        // Render profile buttons if current user has been established through CurrentUser Context
        else {
            return (
                <Fragment>

                    <Mui.IconButton onClick={handleMenuOpen} size='small'>
                        <Mui.Avatar sx={{ bgcolor: '', fontSize: { xs: 25, sm: 32 } }}>{currentUser.userName.charAt(0)}</Mui.Avatar>
                    </Mui.IconButton>

                    <Mui.Menu
                        anchorEl={anchorElement}
                        open={menuOpen}
                        onClose={handleMenuClose}
                        sx={{
                            fontSize: { xs: 20, sm: 25, md: 32 }
                        }}
                    >
                        <Mui.MenuList
                            subheader={
                                <Mui.ListSubheader component="div" id="nested-list-subheader">
                                    Welcome, {currentUser.userName}
                                </Mui.ListSubheader>
                            }
                        >

                            <Mui.MenuItem onClick={() => { navigate('/profile'); handleMenuClose() }}>
                                <Mui.ListItemIcon>
                                    <PersonIcon />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText>
                                    View Profile
                                </Mui.ListItemText>
                            </Mui.MenuItem>

                            <Mui.MenuItem onClick={() => { navigate('/accountdetails'); handleMenuClose() }}>
                                <Mui.ListItemIcon>
                                    <ManageAccountsIcon />
                                </Mui.ListItemIcon>
                                <Mui.ListItemText>
                                    Account Details
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

    // If current user has not been established yet then render loading icon feedback
    return (
        <Mui.Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CircularProgress color='inherit' />
        </Mui.Grid>
    )
}