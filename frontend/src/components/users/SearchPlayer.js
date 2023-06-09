import * as Mui from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import { useState } from 'react';
import axios from 'axios';

export default function SearchPlayer() {

    const [playerSearchValue, setPlayerSearchValue] = useState('')
    const [searchingState, setSearchingState] = useState(null)
    const [playerData, setPlayerData] = useState(null)

    const handlePlayerSearch = () => {
        setSearchingState(true)
        axios.post(`${process.env.REACT_APP_SERVER_URL}users/search-user`, { userName: playerSearchValue })
            .then((response) => {
                setPlayerData(response.data)
            })
            .catch(error => {
                setPlayerData({
                    message: 'A network Error has occured.'
                })
            })
            .finally(() => {
                setSearchingState(false)
            })
    }

    const renderSearchResults = () => {
        if (playerData.message) {
            return (
                <Mui.Typography color={(theme) => theme.palette.error.main}><i>{playerData.message}</i></Mui.Typography>
            )
        }
        else {
            return (
                <Mui.Box sx={{
                    p: { sm: 1, md: 2, lg: 3 }
                }}>
                    <Mui.Typography variant='h3' sx={{ fontWeight: 600, fontSize: 30 }}>{playerData.userName}</Mui.Typography>

                    <AccountCircleIcon sx={{ fontSize: 100 }} />

                    <Mui.Typography>Date created: <b>{new Date(playerData.createdAt).toDateString()}</b></Mui.Typography>

                    <Mui.Box sx={{
                        width: '100%',
                        mt: 3,
                        p: { sm: 1 },
                    }}>
                        <Mui.Typography variant='h4' sx={{ fontSize: { xs: 25 } }}>Highscores</Mui.Typography>

                        <Mui.Grid container spacing={3} my sx={{ maxHeight: 300, overflowY: 'scroll' }}>

                            {playerData.highscores.length ?
                                playerData.highscores.toReversed().map((highscore, index) => {
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
                </Mui.Box>
            )
        }
    }

    return (
        <Mui.Container maxWidth='md' disableGutters>
            <Mui.Paper sx={{
                m: { xs: 1, sm: 2 },
                p: { xs: 1, md: 2 }
            }}>

                <Mui.Typography variant='h2' mb={2} sx={{
                    fontSize: { xs: 30 },
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>

                    <PersonSearchIcon sx={{ fontSize: { xs: 30 }, pr: 1 }} /> Search Player

                </Mui.Typography>

                <Mui.TextField
                    label='Search player name'
                    InputProps={{
                        endAdornment: (
                            <Mui.InputAdornment position='end'>
                                <Mui.IconButton onClick={handlePlayerSearch}>
                                    {searchingState ? <Mui.CircularProgress size={30} /> : <SearchIcon />}
                                </Mui.IconButton>
                            </Mui.InputAdornment>
                        )
                    }}
                    onChange={event => setPlayerSearchValue(event.target.value)}
                />

                <Mui.Divider sx={{ m: 2 }} />

                {playerData ?
                    renderSearchResults()
                    :
                    <Mui.Typography color={(theme) => theme.palette.text.secondary}><i>Player data will show up here</i></Mui.Typography>
                }
            </Mui.Paper>
        </Mui.Container>
    )
}