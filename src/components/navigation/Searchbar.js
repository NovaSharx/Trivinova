import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import * as Mui from '@mui/material'

export default function Searchbar() {
    return (
        <>
            <Mui.IconButton color='inherit'>
                <PersonSearchIcon fontSize='large' /> Profile Search
            </Mui.IconButton>
            <Mui.IconButton color='inherit'>
                <LeaderboardIcon fontSize='large' /> Leaderboards
            </Mui.IconButton>
        </>
    )
}