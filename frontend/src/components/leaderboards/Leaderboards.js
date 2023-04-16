import * as Mui from '@mui/material';

import axios from 'axios';

import { useState } from 'react';

export default function Leaderboards() {

    const [highscoresData, setHighscoresData] = useState(null)

    if (!highscoresData) {
        axios.get(`${process.env.REACT_APP_SERVER_URL}highscores`)
            .then(response => {
                setHighscoresData(response.data)
            })
            .catch(error => {
                console.log(error) // ***Place Holder***
            })
    }

    return (
        <Mui.Container maxWidth='lg'>
            <Mui.Paper sx={{
                p: 2
            }}>
                <Mui.Typography variant='h3'>Leaderboards</Mui.Typography>

                {highscoresData ?
                    <Mui.TableContainer component={Mui.Paper}>
                        <Mui.Table>
                            <Mui.TableHead>
                                <Mui.TableRow>
                                    <Mui.TableCell align='center'>Username</Mui.TableCell>
                                    <Mui.TableCell align='center'>Highscore</Mui.TableCell>
                                    <Mui.TableCell align='center'>Game Mode</Mui.TableCell>
                                    <Mui.TableCell align='center'>Category</Mui.TableCell>
                                    <Mui.TableCell align='center'>Difficulty</Mui.TableCell>
                                    <Mui.TableCell align='center'>Number of Questions</Mui.TableCell>
                                    <Mui.TableCell align='center'>Date Achieved</Mui.TableCell>
                                </Mui.TableRow>
                            </Mui.TableHead>
                            <Mui.TableBody>
                                {highscoresData.map((highscore, index) => {
                                    return (
                                        <Mui.TableRow key={index}>
                                            <Mui.TableCell align='center'>{highscore.userName}</Mui.TableCell>
                                            <Mui.TableCell align='center'>{highscore.highscore}</Mui.TableCell>
                                            <Mui.TableCell align='center'>{highscore.gameMode}</Mui.TableCell>
                                            <Mui.TableCell align='center'>{highscore.category}</Mui.TableCell>
                                            <Mui.TableCell align='center'>{highscore.difficulty}</Mui.TableCell>
                                            <Mui.TableCell align='center'>{highscore.limit}</Mui.TableCell>
                                            <Mui.TableCell align='center'>{new Date(highscore.achievedAt).toLocaleString()}</Mui.TableCell>
                                        </Mui.TableRow>
                                    )
                                })}
                            </Mui.TableBody>
                        </Mui.Table>
                    </Mui.TableContainer>
                    :
                    <Mui.Typography>...Loading Highscores Data...</Mui.Typography>
                }

            </Mui.Paper>
        </Mui.Container>
    )
}