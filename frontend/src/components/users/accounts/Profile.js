import * as Mui from '@mui/material';
import * as MuiLab from '@mui/lab';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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
            <Mui.Container maxWidth='lg'>
                <Mui.Paper sx={{
                    height: 600,
                    p: 1,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <Mui.Typography variant='h2'>
                        ...Loading Profile...
                    </Mui.Typography>

                    <Mui.CircularProgress size={200} />
                </Mui.Paper>
            </Mui.Container>
        )
    }
    else {

        const renderGeneralTab = (
            <Fragment>

                <Mui.Typography variant='h2' fontWeight={600}>{currentUser.userName}</Mui.Typography>

                <AccountCircleIcon sx={{ fontSize: 200 }} />

                <Mui.Typography>Date created: <b>{new Date(currentUser.createdAt).toDateString()}</b></Mui.Typography>

            </Fragment>
        )

        const renderFriendsTab = (
            <Fragment>
                <Mui.Typography variant='h4' fontWeight={300}>...Friends List Coming Soon...</Mui.Typography>
            </Fragment>
        )

        const renderHighscoresTab = (
            <Fragment>

                <Mui.Box sx={{
                    maxHeight: '500px',
                    width: '100%',
                    p: 2,
                    overflowY: 'scroll'
                }}>
                    <Mui.Grid container spacing={3} mt>

                        {currentUser.highscores.length ?
                            currentUser.highscores.toReversed().map((highscore, index) => {
                                return (
                                    <Mui.Grid item xs={12} key={index}>
                                        <Mui.Box sx={{
                                            p: 1,
                                            borderLeft: '5px solid #2f9a2f',
                                            borderBottom: '2px solid #2f9a2f',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Mui.Typography variant='h5'>Score: <b>{highscore.highscore}</b></Mui.Typography>
                                            <Mui.Typography variant='subtitle1'>Date achieved: <b>{new Date(highscore.achievedAt).toLocaleString()}</b></Mui.Typography>
                                        </Mui.Box>
                                    </Mui.Grid>
                                )
                            })
                            :
                            <Mui.Grid item xs={12}>
                                <Mui.Typography color={(theme) => theme.palette.text.secondary}><i>...No highscore data yet...</i></Mui.Typography>
                            </Mui.Grid>
                        }

                    </Mui.Grid>
                </Mui.Box>

            </Fragment>
        )

        return (
            <Mui.Container maxWidth='lg'>
                <Mui.Paper sx={{
                    height: 600,
                    p: 1,
                    borderRadius: 3,
                    display: 'flex'
                }}>

                    <MuiLab.TabContext value={currentTab}>

                        <Mui.Box sx={{ borderRight: 2, borderColor: 'divider' }}>
                            <MuiLab.TabList onChange={handleTabChange} orientation='vertical' centered >
                                <Mui.Tab label='General' value='general' />
                                <Mui.Tab label='Friends' value='friends' />
                                <Mui.Tab label='Highscores' value='highscores' />
                            </MuiLab.TabList>
                        </Mui.Box>

                        <Mui.Box sx={{
                            flexGrow: 1,
                            m: 2
                        }}>
                            <MuiLab.TabPanel value='general'>{renderGeneralTab}</MuiLab.TabPanel>
                            <MuiLab.TabPanel value='friends'>{renderFriendsTab}</MuiLab.TabPanel>
                            <MuiLab.TabPanel value='highscores'>{renderHighscoresTab}</MuiLab.TabPanel>
                        </Mui.Box>

                    </MuiLab.TabContext>

                </Mui.Paper>
            </Mui.Container>
        )
    }

}