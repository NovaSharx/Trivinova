import * as Mui from '@mui/material';

export default function Error404() {
    return (
        <Mui.Box>
            <Mui.Typography fontSize={{ lg: 200, md: 175, sm: 150, xs: 125 }} fontWeight={900}>404</Mui.Typography>
            <Mui.Typography fontSize={{ lg: 50, md: 40, sm: 30, xs: 20 }}>Oops, it looks like this page does not exist</Mui.Typography>
        </Mui.Box>
    )
}