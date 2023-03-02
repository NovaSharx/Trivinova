import * as Mui from '@mui/material'
import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GameLauncher() {

    const navigate = useNavigate()

    const openGameRoute = (gameMode, category = 'random', limit = 10, difficulty = 'random') => {
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
    let [selectedCategory, setselectedCategory] = useState('arts_and_literature')

    const handleModalChange = (gameMode) => {
        if (modalState) {
            setSelectedGameMode(null)
            setModalState(false)
        } else {
            setSelectedGameMode(gameMode)
            setModalState(true)
        }
    }

    const mainScreen = (
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

    const modalStyling = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        color: 'text.primary',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const specializedScreen = (
        <Fragment>

            <Mui.Grid item xs={12}>
                <Mui.ToggleButtonGroup
                    fullWidth
                    orientation='vertical'
                    color='primary'
                    value={selectedCategory}
                    exclusive
                    onChange={(e) => setselectedCategory(e.target.value)}
                >
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
            </Mui.Grid>

            <Mui.Grid item xs={12}>
                <Mui.Button variant='contained' fullWidth onClick={() => { openGameRoute(selectedGameMode, selectedCategory) }}>Launch Game</Mui.Button>
            </Mui.Grid>

        </Fragment>
    )

    const customScreen = (
        <Fragment>

            <Mui.Grid item xs={12}>
                <Mui.Paper elevation={3} sx={{
                    p: 2
                }}>
                    <Mui.Typography variant='h5' textAlign='center' mb>Category</Mui.Typography>

                    <Mui.ToggleButtonGroup
                        fullWidth
                        orientation='vertical'
                        color='primary'
                        value={selectedCategory}
                        exclusive
                        onChange={(e) => setselectedCategory(e.target.value)}
                    >
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
                </Mui.Paper>
            </Mui.Grid>

            <Mui.Grid item xs={12}>
                <Mui.Paper elevation={3} sx={{
                    p: 2
                }}>
                    <Mui.Typography variant='h5' textAlign='center' mb>Difficulty</Mui.Typography>


                </Mui.Paper>
            </Mui.Grid>

            <Mui.Grid item xs={12}>
                <Mui.Button variant='contained' fullWidth onClick={() => { openGameRoute(selectedGameMode, selectedCategory) }}>Launch Game</Mui.Button>
            </Mui.Grid>

        </Fragment>
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
                    <Mui.Container maxWidth='lg' sx={modalStyling}>
                        <Mui.Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column'
                        }}>
                            <Mui.Grid container spacing={5}>
                                {
                                    selectedGameMode === 'specialized' ? specializedScreen :
                                        selectedGameMode === 'custom' ? customScreen :
                                            <>...Work In Progress...<Mui.Button variant='contained' fullWidth onClick={() => { openGameRoute(selectedGameMode) }}>Launch Game</Mui.Button></>
                                }
                            </Mui.Grid>
                        </Mui.Box>
                    </Mui.Container>
                </Mui.Modal>
                {mainScreen}
            </Mui.Paper>
        </Mui.Container>
    )
}