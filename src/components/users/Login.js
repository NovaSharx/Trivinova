import * as Mui from '@mui/material'

import PersonIcon from '@mui/icons-material/Person'

export default function Login() {

    return (
        <div>
            <h1>Login</h1>
            <Mui.Paper>
                <Mui.Avatar sx={{
                    bgcolor: 'secondary.main',
                    mx: 'auto',
                    width: '60px',
                    height: '60px'
                }}>
                    <PersonIcon sx={{ fontSize: '50px' }} />
                </Mui.Avatar>
            </Mui.Paper>
        </div>
    )
}