const router = require('express').Router()
const { Op, Sequelize } = require('sequelize')
const db = require('../models')

const { Highscore } = db

router.get('/', async (req, res) => {
    const highscores = await Highscore.findAll({
        order: [
            ['highscore', 'DESC']
        ]
    })
    res.json(highscores)
})

router.post('/evaluate', async (req, res) => {

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
})

router.post('/', async (req, res) => {
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
})

module.exports = router