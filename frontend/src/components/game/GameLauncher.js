import { useTheme } from '@emotion/react';
import * as Mui from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GameLauncher() {

    const theme = useTheme()

    const navigate = useNavigate()

    // Trivia settings are passed to the game route through it's location state variable 
    const openGameRoute = (gameMode, category = 'random', difficulty = 'random', limit = 10) => {
        navigate('/game', {
            state: {
                gameMode: gameMode,
                limit: limit,
                difficulty: difficulty,
                category: category
            }
        })
    }

    let [modalState, setModalState] = useState(false) // Controls whether or not modal is open or not

    let [selectedGameMode, setSelectedGameMode] = useState(null) // Stores the selected trivia game mode
    let [selectedCategory, setselectedCategory] = useState('random') // Stores the selected trivia category
    let [selectedDifficulty, setSelectedDifficulty] = useState('random') // Stores the selected trivia difficulty level
    let [selectedQuestionLimit, setSelectedQuestionLimit] = useState(10) // Stores the selected number of trivia question to ask

    // Opens modal if closed with proper initial trivia game mode setting values or closes modal if opened and resets game mode setting values to default values
    const handleModalChange = (gameMode) => { 
        if (modalState) {
            setSelectedGameMode(null)
            setModalState(false)
        } else {
            setSelectedGameMode(gameMode)
            setModalState(true)
        }
        setselectedCategory(gameMode !== 'specialized' ? 'random' : 'arts_and_literature')
        setSelectedDifficulty('random')
        setSelectedQuestionLimit(10)
    }

    const gameModeButtonStyling = {
        minHeight: { xs: 100 },
        color: (theme) => theme.palette.text.primary,
        background: `url(./questionmark-background-glow-${theme.palette.mode}mode-button.jpg)`,
        backgroundPosition: 'center center',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        backgroundBlendMode: 'multiply',
        p: { xs: 3, sm: 4, md: 5 }
    }

    // Renders the gamemode selection screen
    const gameModeSelectionScreen = (
        <Mui.Stack spacing={{ xs: 1, sm: 2, md: 3 }} sx={{ width: '100%' }}>

            <Mui.Grow in timeout={2000}>
                <Mui.Button sx={{ ...gameModeButtonStyling, flexDirection: 'column' }} color='secondary' variant='contained' onClick={() => handleModalChange('wildcard')}>
                    <Mui.Typography variant='h3' fontWeight={500} sx={{ fontSize: { xs: 20, sm: 25, md: 30, lg: 35 } }}>Wildcard Mode</Mui.Typography>
                    <Mui.Typography sx={{ fontSize: { xs: 10, sm: 13, md: 15 } }}>Category: <b>Random</b>, Difficulty: <b>Random</b>, Number of questions: <b>10</b></Mui.Typography>
                </Mui.Button>
            </Mui.Grow>

            <Mui.Grow in timeout={2500}>
                <Mui.Button sx={{ ...gameModeButtonStyling, flexDirection: 'column' }} color='secondary' variant='contained' onClick={() => handleModalChange('specialized')}>
                    <Mui.Typography variant='h3' fontWeight={500} sx={{ fontSize: { xs: 20, sm: 25, md: 30, lg: 35 } }}>Specialized Mode</Mui.Typography>
                    <Mui.Typography sx={{ fontSize: { xs: 10, sm: 13, md: 15 } }}>Category: <b>Custom</b>, Difficulty: <b>Random</b>, Number of questions: <b>10</b></Mui.Typography>
                </Mui.Button>
            </Mui.Grow>

            <Mui.Grow in timeout={3000}>
                <Mui.Button sx={{ ...gameModeButtonStyling, flexDirection: 'column' }} color='secondary' variant='contained' onClick={() => handleModalChange('custom')}>
                    <Mui.Typography variant='h3' fontWeight={500} sx={{ fontSize: { xs: 20, sm: 25, md: 30, lg: 35 } }}>Custom Settings Mode</Mui.Typography>
                    <Mui.Typography sx={{ fontSize: { xs: 10, sm: 13, md: 15 } }}>Category: <b>Custom</b>, Difficulty: <b>Custom</b>, Number of questions: <b>Custom</b></Mui.Typography>
                </Mui.Button>
            </Mui.Grow>

        </Mui.Stack>
    )

    // Rich array used to specify markings for the question limit slider
    const limitMarks = [
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
        { value: 40, label: '40' },
        { value: 50, label: '50' }
    ]

    // Renders the corresponding game mode settings according to the pre-selected game mode
    const gameModeSettings = (
        <Mui.Container sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            maxWidth: { xs: 9 / 10, sm: 'sm', md: 'md' },
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderRadius: 1,
            boxShadow: 24,
            p: { xs: 1, sm: 2, md: 3 }
        }}>
            <Mui.Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <Mui.Grid container spacing={{ xs: 1, sm: 2, md: 3 }} justifyContent='center'>

                    <Mui.Grid item xs={12}>
                        <Mui.Paper elevation={3} sx={{
                            p: 2,
                            textAlign: 'center'
                        }}>

                            <Mui.FormControl fullWidth variant='filled'>
                                <Mui.FormLabel id='custom-category' sx={{ fontSize: { xs: 10, sm: 12, md: 15 } }}>Category</Mui.FormLabel>
                                <Mui.Select
                                    variant='outlined'
                                    aria-labelledby="cutom-category"
                                    value={selectedCategory}
                                    onChange={(event) => setselectedCategory(event.target.value)}
                                    disabled={selectedGameMode === 'wildcard'}
                                    sx={{ fontSize: { xs: 13, sm: 14, md: 15 } }}
                                >
                                    <Mui.MenuItem value='random' disabled={selectedGameMode !== 'custom'}>
                                        Random
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='arts_and_literature'>
                                        Arts & Literature
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='film_and_tv'>
                                        Film & TV
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='food_and_drink'>
                                        Food & Drink
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='general_knowledge'>
                                        General Knowledge
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='geography'>
                                        Geography
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='history'>
                                        History
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='music'>
                                        Music
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='science'>
                                        Science
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='society_and_culture'>
                                        Society & Culture
                                    </Mui.MenuItem>
                                    <Mui.MenuItem value='sport_and_leisure'>
                                        Sport & Leisure
                                    </Mui.MenuItem>
                                </Mui.Select>
                            </Mui.FormControl>

                        </Mui.Paper>
                    </Mui.Grid>

                    <Mui.Grid item xs={12}>
                        <Mui.Paper elevation={3} sx={{
                            p: 2,
                            textAlign: 'center'
                        }}>

                            <Mui.FormControl fullWidth variant='filled'>
                                <Mui.FormLabel id='custom-difficulty' sx={{ fontSize: { xs: 10, sm: 12, md: 15 } }}>Difficulty</Mui.FormLabel>
                                <Mui.RadioGroup
                                    row
                                    sx={{ justifyContent: 'center' }}
                                    aria-labelledby='custom-difficulty'
                                    name='custom-difficulty-radio-button-group'
                                    value={selectedDifficulty}
                                    onChange={(event) => setSelectedDifficulty(event.target.value)}
                                >
                                    <Mui.FormControlLabel sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} disableTypography value="random" control={<Mui.Radio />} label="Random" disabled={selectedGameMode !== 'custom'} />
                                    <Mui.FormControlLabel sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} disableTypography value="easy" control={<Mui.Radio />} label="Easy" disabled={selectedGameMode !== 'custom'} />
                                    <Mui.FormControlLabel sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} disableTypography value="medium" control={<Mui.Radio />} label="Medium" disabled={selectedGameMode !== 'custom'} />
                                    <Mui.FormControlLabel sx={{ fontSize: { xs: 12, sm: 14, md: 16 } }} disableTypography value="hard" control={<Mui.Radio />} label="Hard" disabled={selectedGameMode !== 'custom'} />
                                </Mui.RadioGroup>
                            </Mui.FormControl>

                        </Mui.Paper>
                    </Mui.Grid>

                    <Mui.Grid item xs={12}>
                        <Mui.Paper elevation={3} sx={{
                            p: 2,
                            textAlign: 'center'
                        }}>

                            <Mui.FormControl fullWidth variant='filled'>
                                <Mui.FormLabel id='custom-limit' sx={{ fontSize: { xs: 10, sm: 12, md: 15 } }}>Number of Questions</Mui.FormLabel>
                                <Mui.Slider
                                    aria-labelledby='custom-limit'
                                    marks={limitMarks}
                                    value={selectedQuestionLimit}
                                    step={10} min={10} max={50}
                                    sx={{
                                        '& .MuiSlider-markLabel': {
                                            fontSize: { xs: 10, sm: 12, md: 14 },
                                        }
                                    }}
                                    onChange={(event) => setSelectedQuestionLimit(event.target.value)}
                                    disabled={selectedGameMode !== 'custom'}
                                />
                            </Mui.FormControl>

                        </Mui.Paper>
                    </Mui.Grid>

                    <Mui.Grid item xs>
                        <Mui.Button variant='contained' sx={{ fontSize: { xs: 10, sm: 15, md: 20 } }} fullWidth onClick={() => { openGameRoute(selectedGameMode, selectedCategory, selectedDifficulty, selectedQuestionLimit) }}>Launch Game</Mui.Button>
                    </Mui.Grid>

                </Mui.Grid>
            </Mui.Box>
        </Mui.Container>
    )

    return (
        <Mui.Container component='main' disableGutters maxWidth='lg'>
            <Mui.Paper elevation={10} sx={{
                m: { xs: 1, sm: 2 },
                p: { xs: 1, sm: 2, md: 3 },
                display: 'flex',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0)',
                backdropFilter: 'blur(10px)'
            }}>
                <Mui.Modal
                    open={modalState}
                    onClose={() => setModalState(false)}
                    aria-labelledby="game-launcher-modal"
                    aria-describedby="game-launcher-modal"
                >
                    {gameModeSettings}
                </Mui.Modal>
                {gameModeSelectionScreen}
            </Mui.Paper>
        </Mui.Container>
    )
}