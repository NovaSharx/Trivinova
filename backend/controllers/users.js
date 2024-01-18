const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = db

// Createa a new account route
router.post('/', async (req, res) => {
    try {
        const { firstName, lastName, email, userName, password } = req.body

        // RegEx testing
        const nameRegEx = new RegExp('^[A-Za-z]{2,16}$')
        const emailRegEx = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
        const userNameRegEx = new RegExp('^[A-Za-z][A-Za-z0-9_]{2,15}$')
        const passwordRegex = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$')
        if (
            !nameRegEx.test(firstName) ||
            !nameRegEx.test(lastName) ||
            !emailRegEx.test(email) ||
            !userNameRegEx.test(userName) ||
            !passwordRegex.test(password)
        ) {
            throw ({ message: 'User details entered do no match required format' })
        }

        // Creates new user data
        const { userId } = await User.create({
            email: email,
            userName: userName,
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
            role: 'player',
            passwordDigest: await bcrypt.hash(password, 10)
        })

        // Retrieves newly created user data
        const user = await User.findOne({
            where: {
                userId: userId
            },
            include: 'highscores'
        })

        // Creates user JWT token
        const token = await jwt.sign({ id: user.dataValues.userId }, process.env.JWT_SECRET)
        res.json({ token, user })
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ message: 'Username and email address must be unique' })
        } else {
            res.status(400).json(error)
        }
    }
})

// Search user route
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

module.exports = router