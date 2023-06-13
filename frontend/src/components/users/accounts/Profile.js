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
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Mui.Typography>
                        ...Loading Profile...
                    </Mui.Typography>

                    <Mui.CircularProgress size={100} />
                </Mui.Paper>
            </Mui.Container>
        )
    }
    else {

        const renderGeneralTab = (
            <Fragment>

                <Mui.Typography sx={{ fontSize: { sm: 20, md: 24, lg: 28 }, fontWeight: 600 }}>{currentUser.userName}</Mui.Typography>

                <AccountCircleIcon sx={{ fontSize: { xs: 100, sm: 125, md: 150, lg: 175 } }} />

                <Mui.Typography sx={{ fontSize: { sm: 20, md: 24, lg: 28 } }}>Date created: <b>{new Date(currentUser.createdAt).toDateString()}</b></Mui.Typography>

            </Fragment>
        )

        const renderFriendsTab = (
            <Fragment>
                <Mui.Typography sx={{ fontSize: { sm: 20, md: 24, lg: 28 }, fontWeight: 300 }}>...Friends List Coming Soon...</Mui.Typography>
            </Fragment>
        )

        const renderHighscoresTab = (
            <Fragment>

                <Mui.Box sx={{
                    width: '100%',
                    mt: 3,
                    p: { sm: 1 }
                }}>
                    <Mui.Grid container spacing={3} mt sx={{ maxHeight: 300, overflowY: 'scroll' }}>

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
                                            <Mui.Typography sx={{ fontSize: { sm: 18, md: 20 } }}>Score: <b>{highscore.highscore}</b></Mui.Typography>
                                            <Mui.Typography sx={{ fontSize: { xs: 14, sm: 16, md: 18 } }}>Date achieved: <b>{new Date(highscore.achievedAt).toLocaleString()}</b></Mui.Typography>
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
            <Mui.Container maxWidth='lg' disableGutters>
                <Mui.Paper sx={{
                    height: 600,
                    m: { xs: 1, sm: 2 },
                    p: { xs: 1, md: 2 },
                    borderRadius: 3,
                    display: 'flex'
                }}>

                    <MuiLab.TabContext value={currentTab}>

                        <Mui.Box sx={{ borderRight: 2, borderColor: 'divider' }}>
                            <MuiLab.TabList onChange={handleTabChange} orientation='vertical' centered>
                                <Mui.Tab label='General' value='general' sx={{ fontSize: { xs: 10, sm: 12, md: 14, lg: 16 }, minWidth: 0, p: { xs: 1, sm: 2, md: 3 } }} />
                                <Mui.Tab label='Friends' value='friends' sx={{ fontSize: { xs: 10, sm: 12, md: 14, lg: 16 }, minWidth: 0, p: { xs: 1, sm: 2, md: 3 } }} />
                                <Mui.Tab label='Highscores' value='highscores' sx={{ fontSize: { xs: 10, sm: 12, md: 14, lg: 16 }, minWidth: 0, p: { xs: 1, sm: 2, md: 3 } }} />
                            </MuiLab.TabList>
                        </Mui.Box>

                        <Mui.Box sx={{
                            flexGrow: 1
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