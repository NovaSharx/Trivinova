import * as Mui from '@mui/material';
import * as MuiLab from '@mui/lab';

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Fragment, useContext, useState } from 'react';
import { CurrentUser } from '../../contexts/CurrentUser';

export default function Profile() {

    const { currentUser } = useContext(CurrentUser)

    const [currentTab, setCurrentTab] = useState('general')

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue)
    }

    if (!currentUser) {
        return (
            <Mui.Typography variant='h2'>
                ...Loading Profile...
            </Mui.Typography>
        )
    }
    else {

        const renderGaneralTab = (
            <Fragment>

                <Mui.Typography variant='h2' fontWeight={600}>{currentUser.userName}</Mui.Typography>

                <Mui.IconButton>
                    <AccountCircleIcon sx={{ fontSize: 200 }} />
                </Mui.IconButton>

            </Fragment>
        )

        const renderFriendsTab = (
            <Fragment>
                <Mui.Typography variant='h2' fontWeight={600}>Friends List</Mui.Typography>
            </Fragment>
        )

        const renderRecordsTab = (
            <Fragment>

                <Mui.Typography variant='h2' fontWeight={600}>Records</Mui.Typography>

                <Mui.Grid container>

                    <Mui.Grid item xs={12}>
                        <Mui.Typography>WILDCARD MODE</Mui.Typography>
                    </Mui.Grid>

                    <Mui.Grid item xs={12}>
                        <Mui.Typography>SPECIALIZED MODE</Mui.Typography>
                    </Mui.Grid>

                    <Mui.Grid item xs={12}>
                        <Mui.Typography>CUSTOM SETTINGS MODE</Mui.Typography>
                    </Mui.Grid>

                </Mui.Grid>

            </Fragment>
        )

        return (
            <Mui.Container maxWidth='lg'>
                <Mui.Paper sx={{
                    minHeight: 600,
                    p: 3,
                    borderRadius: 5,
                    display: 'flex'
                }}>

                    <MuiLab.TabContext value={currentTab}>

                        <Mui.Box sx={{ borderRight: 2, borderColor: 'divider' }}>
                            <MuiLab.TabList onChange={handleTabChange} orientation='vertical' centered >
                                <Mui.Tab label='General' value='general' />
                                <Mui.Tab label='Friends List' value='friends list' />
                                <Mui.Tab label='Records' value='records' />
                            </MuiLab.TabList>
                        </Mui.Box>

                        <Mui.Box sx={{
                            flexGrow: 1
                        }}>
                            <MuiLab.TabPanel value='general'>{renderGaneralTab}</MuiLab.TabPanel>
                            <MuiLab.TabPanel value='friends list'>{renderFriendsTab}</MuiLab.TabPanel>
                            <MuiLab.TabPanel value='records'>{renderRecordsTab}</MuiLab.TabPanel>
                        </Mui.Box>

                    </MuiLab.TabContext>

                </Mui.Paper>
            </Mui.Container>
        )
    }

}