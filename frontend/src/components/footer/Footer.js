import * as Mui from '@mui/material';

export default function Footer() {

    return (
        <Mui.Container maxWidth='x1' disableGutters>
            <Mui.Box sx={{
                p: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(5px)'
            }}>
                <Mui.Typography color='white' sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }}>
                    All trivia data is supplied by <Mui.Link href='https://the-trivia-api.com/' target='_blank' rel='noreferrer'>The Trivia API</Mui.Link>
                </Mui.Typography>
            </Mui.Box>
        </Mui.Container>
    )
}