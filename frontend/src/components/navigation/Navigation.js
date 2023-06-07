import * as Mui from '@mui/material';

import LightbulbCircleIcon from '@mui/icons-material/LightbulbCircle';

import MenuDrawer from './MenuDrawer';
import { useNavigate } from 'react-router-dom';
import ProfileActions from './ProfileActions';

export default function Navigation() {

    const navigate = useNavigate()

    return (
        <Mui.AppBar position='static'>
            <Mui.Container maxWidth='x1'>
                <Mui.Toolbar disableGutters>

                    <Mui.Grid container direction='row'>

                        <Mui.Grid item xs sx={{ display: 'flex' }}>
                            <MenuDrawer />
                        </Mui.Grid>

                        <Mui.Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Mui.Link component='button' onClick={() => navigate("/")} underline='none' color='inherit'>
                                <Mui.Typography variant='h4' sx={{ display: 'flex', alignItems: 'center', fontSize: { xs: 20, sm: 25, md: 32 } }}>
                                    TRIVIN<LightbulbCircleIcon sx={{ fontSize: { xs: 20, sm: 25, md: 32 } }} />VA
                                </Mui.Typography>
                            </Mui.Link>
                        </Mui.Grid>

                        <Mui.Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <ProfileActions />
                        </Mui.Grid>

                    </Mui.Grid>

                </Mui.Toolbar>
            </Mui.Container>
        </Mui.AppBar>
    )
}