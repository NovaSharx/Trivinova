import * as Mui from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GameLauncher() {

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
        height: 150,
        background: 'url(./pexels-dmitry-demidov-3852577.jpg)',
        backgroundColor: 'grey',
        backgroundBlendMode: 'multiply',
        fontSize: '2.5em',
        '&:hover': {
            fontSize: '2.8em'
        }
    }

    // Renders the gamemode selection screen
    const gameModeSelectionScreen = (
        <Mui.Stack spacing={3} sx={{ width: '100%' }}>

            <Mui.Grow in timeout={2000}>
                <Mui.Button sx={gameModeButtonStyling} color='secondary' variant='contained' onClick={() => handleModalChange('wildcard')}>
                    Wildcard Mode
                </Mui.Button>
            </Mui.Grow>

            <Mui.Grow in timeout={2500}>
                <Mui.Button sx={gameModeButtonStyling} color='secondary' variant='contained' onClick={() => handleModalChange('specialized')}>
                    Specialized Mode
                </Mui.Button>
            </Mui.Grow>

            <Mui.Grow in timeout={3000}>
                <Mui.Button sx={gameModeButtonStyling} color='secondary' variant='contained' onClick={() => handleModalChange('custom')}>
                    Custom Settings Mode
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
        <Mui.Container maxWidth='md' sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            color: 'text.primary',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4
        }}>
            <Mui.Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column'
            }}>
                <Mui.Grid container spacing={5} justifyContent='center'>

                    <Mui.Grid item xs={12}>
                        <Mui.Paper elevation={3} sx={{
                            p: 2,
                            textAlign: 'center'
                        }}>

                            <Mui.FormControl fullWidth variant='filled'>
                                <Mui.FormLabel id='custom-category'>Category</Mui.FormLabel>
                                <Mui.Select
                                    variant='outlined'
                                    labelledId="cutom-category"
                                    value={selectedCategory}
                                    onChange={(event) => setselectedCategory(event.target.value)}
                                    disabled={selectedGameMode === 'wildcard'}
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
                                {/* <Mui.ToggleButtonGroup
                                    fullWidth
                                    orientation='vertical'
                                    color='primary'
                                    value={selectedCategory}
                                    exclusive
                                    onChange={(event) => setselectedCategory(event.target.value)}
                                    aria-labelledby="cutom-category"
                                    disabled={selectedGameMode === 'wildcard'}
                                >
                                    <Mui.ToggleButton value='random' disabled={selectedGameMode !== 'custom'}>
                                        Random
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='arts_and_literature'>
                                        Arts & Literature
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='film_and_tv'>
                                        Film & TV
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='food_and_drink'>
                                        Food & Drink
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='general_knowledge'>
                                        General Knowledge
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='geography'>
                                        Geography
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='history'>
                                        History
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='music'>
                                        Music
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='science'>
                                        Science
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='society_and_culture'>
                                        Society & Culture
                                    </Mui.ToggleButton>
                                    <Mui.ToggleButton value='sport_and_leisure'>
                                        Sport & Leisure
                                    </Mui.ToggleButton>
                                </Mui.ToggleButtonGroup> */}
                            </Mui.FormControl>

                        </Mui.Paper>
                    </Mui.Grid>

                    <Mui.Grid item xs={12}>
                        <Mui.Paper elevation={3} sx={{
                            p: 2,
                            textAlign: 'center'
                        }}>

                            <Mui.FormControl fullWidth variant='filled'>
                                <Mui.FormLabel id='custom-difficulty'>Difficulty</Mui.FormLabel>
                                <Mui.RadioGroup
                                    row
                                    sx={{ justifyContent: 'center' }}
                                    aria-labelledby='custom-difficulty'
                                    name='custom-difficulty-radio-button-group'
                                    value={selectedDifficulty}
                                    onChange={(event) => setSelectedDifficulty(event.target.value)}
                                >
                                    <Mui.FormControlLabel value="random" control={<Mui.Radio />} label="Random" disabled={selectedGameMode !== 'custom'} />
                                    <Mui.FormControlLabel value="easy" control={<Mui.Radio />} label="Easy" disabled={selectedGameMode !== 'custom'} />
                                    <Mui.FormControlLabel value="medium" control={<Mui.Radio />} label="Medium" disabled={selectedGameMode !== 'custom'} />
                                    <Mui.FormControlLabel value="hard" control={<Mui.Radio />} label="Hard" disabled={selectedGameMode !== 'custom'} />
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
                                <Mui.FormLabel id='custom-limit'>Number of Questions</Mui.FormLabel>
                                <Mui.Slider
                                    aria-labelledby='custom-limit'
                                    marks={limitMarks}
                                    value={selectedQuestionLimit}
                                    step={10} min={10} max={50}
                                    onChange={(event) => setSelectedQuestionLimit(event.target.value)}
                                    disabled={selectedGameMode !== 'custom'}
                                />
                            </Mui.FormControl>

                        </Mui.Paper>
                    </Mui.Grid>

                    <Mui.Grid item xs={6}>
                        <Mui.Button variant='contained' fullWidth onClick={() => { openGameRoute(selectedGameMode, selectedCategory, selectedDifficulty, selectedQuestionLimit) }}>Launch Game</Mui.Button>
                    </Mui.Grid>

                </Mui.Grid>
            </Mui.Box>
        </Mui.Container>
    )

    return (
        <Mui.Container component='main'>
            <Mui.Paper elevation={10} sx={{ mt: 10, p: 3, display: 'flex', justifyContent: 'center', background: 'rgba(0,0,0,0)', backdropFilter: 'blur(10px)' }}>
                <Mui.Modal
                    open={modalState}
                    onClose={() => setModalState(false)}
                    aria-labelledby="test"
                    aria-describedby="test"
                >
                    {gameModeSettings}
                </Mui.Modal>
                {gameModeSelectionScreen}
            </Mui.Paper>
        </Mui.Container>
    )
}