const router = require('express').Router()
const axios = require('axios')

router.post('/', async (req, res) => {

    let limit = `limit=${req.body.limit}`
    let category = req.body.category === 'random' ? '' : `&categories=${req.body.category}`
    let difficulty = req.body.difficulty === 'random' ? '' : `&difficulty=${req.body.difficulty}`
    let API_URL = 'https://the-trivia-api.com/api/questions?' + limit + category + difficulty

    try {
        const apiResponse = await axios.get(API_URL)
        res.json(apiResponse.data)
    } catch (error) {
        res.status(503).json({
            message: `Uh oh... trivia data unavailable.`
        })
    }
})

module.exports = router