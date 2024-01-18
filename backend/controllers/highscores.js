const router = require('express').Router()
const { Op, Sequelize } = require('sequelize')
const db = require('../models')

const { Highscore } = db

// Returns all highscores data
router.get('/', async (req, res) => {
    try {
        const highscores = await Highscore.findAll({
            order: [
                ['highscore', 'DESC']
            ]
        })
        res.json(highscores)
    } catch (error) {
        res.status(502).json({
            message: `Failed to retrieve highscore data`
        })
    }
})

// Calculates if a highscore has been achieved
router.post('/evaluate', async (req, res) => {
    try {
        const { count, rows } = await Highscore.findAndCountAll({
            where: {
                gameMode: req.body.gameMode
            },
            order: Sequelize.col('highscore')
        })

        if (count < 5) {
            res.json(true)
        }
        else if (req.body.highscore >= rows[0].highscore) {
            res.json(true)
        }
        else {
            res.json(false)
        }
    } catch (error) {
        res.status(502).json({
            message: `An internal error has occured while evaluating highscore`
        })
    }
})

// Records highscores into the database
router.post('/', async (req, res) => {
    try {
        const { count, rows } = await Highscore.findAndCountAll({
            where: {
                gameMode: req.body.gameMode
            },
            order: Sequelize.col('highscore')
        })

        if (count < 5) {
            await Highscore.create(req.body)
        }
        else if (req.body.highscore >= rows[0].highscore) {
            await Highscore.destroy({
                where: {
                    highscoreId: rows[0].highscoreId
                }
            })

            await Highscore.create(req.body)
        }
        else {
            return
        }

        res.json()

    } catch (error) {
        res.status(502).json({
            message: `An internal error was encountered while submitting highscore data`
        })
    }

})

module.exports = router