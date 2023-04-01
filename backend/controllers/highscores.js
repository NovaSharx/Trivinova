const router = require('express').Router()
const db = require('../models')

const { Highscore } = db

router.get('/', async (req, res) => {
    const highscores = await Highscore.findAll()
    res.json(highscores)
})

module.exports = router