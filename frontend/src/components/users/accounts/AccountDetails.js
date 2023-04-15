import * as Mui from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext } from 'react';
import { CurrentUser } from '../../contexts/CurrentUser';

export default function AccountDetails() {

    const { currentUser } = useContext(CurrentUser)

    if (!currentUser) {
        return (
            <Mui.Container maxWidth='md'>
                <Mui.Paper sx={{
                    p: 2
                }}>
                    ...Loading...
                </Mui.Paper>
            </Mui.Container>
        )
    }
    else {
        return (
            <Mui.Container maxWidth='md'>
                <Mui.Paper sx={{
                    p: 2
                }}>
                    <Mui.Grid container direction='column' spacing={2}>

                        <Mui.Grid item xs={12}>
                            <Mui.IconButton>
                                <AccountCircleIcon sx={{ fontSize: 100 }} />
                            </Mui.IconButton>

                            <Mui.Typography><b>Username:</b> {currentUser.userName}</Mui.Typography>
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.Typography><b>First Name:</b> {currentUser.firstName}</Mui.Typography>
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.Typography><b>Last Name:</b> {currentUser.lastName}</Mui.Typography>
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.Typography><b>Email:</b> {currentUser.email}</Mui.Typography>
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.Typography><b>Date created:</b> {new Date(currentUser.createdAt).toLocaleString()}</Mui.Typography>
                        </Mui.Grid>

                        <Mui.Grid item xs={12}>
                            <Mui.Typography><b>Last updated:</b> {new Date(currentUser.updatedAt).toLocaleString()}</Mui.Typography>
                        </Mui.Grid>

                    </Mui.Grid>
                </Mui.Paper>
            </Mui.Container>
        )
    }
}