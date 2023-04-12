import * as Mui from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useContext } from 'react';
import { CurrentUser } from '../../contexts/CurrentUser';

export default function Profile() {

    const { currentUser } = useContext(CurrentUser)

    if (!currentUser) {
        return (
            <>
                ...Loading Profile...
            </>
        )
    }
    else {
        return (
            <Mui.Container maxWidth='lg'>
                <Mui.Typography variant='h2' fontWeight={600}>{currentUser.userName}</Mui.Typography>
                <Mui.IconButton>
                    <AccountCircleIcon sx={{ color: 'white', fontSize: 200 }} />
                </Mui.IconButton>
            </Mui.Container>
        )
    }

}