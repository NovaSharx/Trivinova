const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = db

// Need to secure this route from the public
router.get('/', async (req, res) => {
    const users = await User.findAll({ include: 'highscores' })
    res.json(users)
})

router.post('/', async (req, res) => {
    const { password, ...otherUserData } = req.body
    const user = await User.create({
        ...otherUserData,
        role: 'player',
        passwordDigest: await bcrypt.hash(password, 10)
    })

    const token = await jwt.sign({ id: user.dataValues.userId }, process.env.JWT_SECRET)
    res.json({ token, user })
})

// Work In Progress...
router.post('/add-friend', async (req, res) => {
    res.json("Added Friend")
})

module.exports = router