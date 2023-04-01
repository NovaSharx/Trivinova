const db = require('../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { User } = db

const defineCurrentUser = async (req, res, next) => {
    try {
        const [method, token] = req.headers.authorization.split(' ')
        if (method === 'Bearer') {
            const result = await jwt.verify(token, process.env.JWT_SECRET)
            const { id } = result
            const user = await User.findOne({
                where: {
                    userId: id
                }
            })
            req.currentUser = user
            next()
        }
    } catch (error) {
        req.currentUser = {
            defaultName: 'Guest'
        }
        next()
    }
}

module.exports = defineCurrentUser