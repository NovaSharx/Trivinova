import * as Mui from '@mui/material';

import LeaderboardIcon from '@mui/icons-material/Leaderboard'

import { DataGrid } from '@mui/x-data-grid';

import axios from 'axios';

import { Fragment, useState } from 'react';

export default function Leaderboards() {

    const [highscoresData, setHighscoresData] = useState(null)

    if (!highscoresData) {
        axios.get(`${process.env.REACT_APP_SERVER_URL}highscores`)
            .then(response => {
                const highscores = response.data.map((highscore, index) => {
                    return { ...highscore, rank: index + 1 }
                })
                setHighscoresData(highscores)
            })
            .catch(error => {
                console.log(error) // ***Place Holder***
            })
    }

    const renderLeaderboardTable = () => {
        if (highscoresData) {

            const columns = [
                { field: 'id', headerName: 'Rank', width: 70 },
                { field: 'userName', headerName: 'Username', width: 150 },
                { field: 'highscore', headerName: 'Highscore', width: 100 },
                { field: 'gameMode', headerName: 'Game Mode', width: 120 },
                { field: 'category', headerName: 'Category', width: 120 },
                { field: 'difficulty', headerName: 'Difficulty', width: 120 },
                { field: 'limit', headerName: 'Number of Questions', width: 200 },
                { field: 'achievedAt', headerName: 'Date Achieved', width: 200 }
            ]

            const rows = highscoresData.map(highscore => {
                return {
                    id: highscore.rank,
                    userName: highscore.userName,
                    highscore: highscore.highscore,
                    gameMode: highscore.gameMode,
                    category: highscore.category,
                    difficulty: highscore.difficulty,
                    limit: highscore.limit,
                    achievedAt: new Date(highscore.achievedAt).toLocaleString(),
                }
            })

            return (
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={rows}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                    disableRowSelectionOnClick
                    sx={{
                        // fontSize: 5
                    }}
                />
            )
        }
        else {
            return (
                <Fragment>
                    <Mui.Typography variant='h5'>...Loading Highscores Data...</Mui.Typography>
                    <Mui.LinearProgress />
                </Fragment>
            )
        }
    }

    return (
        <Mui.Container maxWidth='lg' disableGutters>
            <Mui.Paper sx={{
                m: { xs: 1, sm: 2 },
                p: { xs: 1, md: 2 }
            }}>
                <Mui.Typography variant='h2' mb={2}
                    sx={{
                        fontSize: { xs: 30 },
                        fontWeight: 600,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <LeaderboardIcon sx={{ fontSize: { xs: 30 }, pr: 1 }} /> Leaderboards

                </Mui.Typography>

                {renderLeaderboardTable()}

            </Mui.Paper>
        </Mui.Container>
    )
}