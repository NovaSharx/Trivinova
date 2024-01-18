const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = db

// Authenticates a user signing in
router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { userName: req.body.userName },
            include: 'highscores'
        })

        if (!user || !await bcrypt.compare(req.body.password, user.dataValues.passwordDigest)) {
            res.status(404).json({
                message: `Invalid username or password`
            })
        } else {
            const token = await jwt.sign({ id: user.dataValues.userId }, process.env.JWT_SECRET)
            res.json({ user, token })
        }
    } catch {
        res.status(400).json({ message: 'Something went wrong while trying to log in' })
    }
})

// Returns signed in user data
router.get('/profile', async (req, res) => {
    // defineCurrentUser middleware verifies the jwt token and attaches the currentUser data to the request
    res.json(req.currentUser)
})

module.exports = router