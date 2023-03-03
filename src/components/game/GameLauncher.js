import * as Mui from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GameLauncher() {

    const navigate = useNavigate()

    const openGameRoute = (gameMode, category = 'random', difficulty = 'random', limit = 10) => {
        navigate('/game/' + gameMode, {
            state: {
                gameMode: gameMode,
                limit: limit,
                difficulty: difficulty,
                category: category
            }
        })
    }

    let [modalState, setModalState] = useState(false)
    let [selectedGameMode, setSelectedGameMode] = useState(null)
    let [selectedCategory, setselectedCategory] = useState('random')
    let [selectedDifficulty, setSelectedDifficulty] = useState('random')
    let [selectedQuestionLimit, setSelectedQuestionLimit] = useState(10)

    // Rich array used to specify markings for the question limit slider
    const limitMarks = [
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
        { value: 40, label: '40' },
        { value: 50, label: '50' }
    ]

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

    const gameModeSelectionScreen = (
        <Mui.Stack spacing={5} sx={{ '& button': { width: 600, height: 300, background: 'url(./pexels-dmitry-demidov-3852577.jpg)', backgroundColor: 'grey', backgroundBlendMode: 'multiply' } }}>

            {/* Make into Mui Cards with details */}

            <Mui.Grow in timeout={500}>
                <Mui.Button color='secondary' variant='contained' onClick={() => handleModalChange('wildcard')}>
                    <Mui.Typography variant='h4'>
                        Wildcard Trivia
                    </Mui.Typography>
                </Mui.Button>
            </Mui.Grow>

            <Mui.Grow in timeout={1000}>
                <Mui.Button color='secondary' variant='contained' onClick={() => handleModalChange('specialized')}>
                    <Mui.Typography variant='h4'>
                        Specialized Trivia
                    </Mui.Typography>
                </Mui.Button>
            </Mui.Grow>

            <Mui.Grow in timeout={1500}>
                <Mui.Button color='secondary' variant='contained' onClick={() => handleModalChange('custom')}>
                    <Mui.Typography variant='h4'>
                        Custom Trivia
                    </Mui.Typography>
                </Mui.Button>
            </Mui.Grow>

        </Mui.Stack>
    )

    return (
        <Mui.Container component='main'>
            <Mui.Paper elevation={5} sx={{ mt: 10, p: 5, display: 'flex', justifyContent: 'center' }}>
                <Mui.Modal
                    open={modalState}
                    onClose={() => setModalState(false)}
                    aria-labelledby="test"
                    aria-describedby="test"
                >
                    <Mui.Container maxWidth='lg' sx={{
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
                            <Mui.Grid container spacing={5}>

                                <Mui.Grid item xs={12}>
                                    <Mui.Paper elevation={3} sx={{
                                        p: 2,
                                        textAlign: 'center'
                                    }}>

                                        <Mui.FormControl fullWidth variant='filled'>
                                            <Mui.FormLabel id='custom-category'>Category</Mui.FormLabel>
                                            <Mui.ToggleButtonGroup
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
                                            </Mui.ToggleButtonGroup>
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

                                <Mui.Grid item xs={12}>
                                    <Mui.Button variant='contained' fullWidth onClick={() => { openGameRoute(selectedGameMode, selectedCategory, selectedDifficulty, selectedQuestionLimit) }}>Launch Game</Mui.Button>
                                </Mui.Grid>

                            </Mui.Grid>
                        </Mui.Box>
                    </Mui.Container>
                </Mui.Modal>
                {gameModeSelectionScreen}
            </Mui.Paper>
        </Mui.Container>
    )
}