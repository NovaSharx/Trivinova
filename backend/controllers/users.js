const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = db

router.get('/', async (req, res) => {
    const users = await User.findAll({ include: 'highscores' })
    res.json(users)
})

router.post('/', async (req, res) => {
    const { firstName, lastName, password, ...otherUserData } = req.body
    const { userId } = await User.create({
        ...otherUserData,
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        role: 'player',
        passwordDigest: await bcrypt.hash(password, 10)
    })

    const user = await User.findOne({
        where: {
            userId: userId
        },
        include: 'highscores'
    })

    const token = await jwt.sign({ id: user.dataValues.userId }, process.env.JWT_SECRET)
    res.json({ token, user })
})

router.post('/search-user', async (req, res) => {
    try {
        const { userId, userName, createdAt, highscores } = await User.findOne({
            where: {
                userName: req.body.userName
            },
            include: 'highscores'
        })

        res.json({ userId, userName, createdAt, highscores })
    }
    catch {
        res.json({ message: `Sorry, could not find user '${req.body.userName}'. Remember to check spelling and casing.` })
    }
})

// Work In Progress...
router.post('/add-friend', async (req, res) => {
    res.json("Added Friend")
})

module.exports = router