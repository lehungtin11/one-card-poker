const cardController = require('../app/controllers/CardControllers')
const express = require('express')
const router = express.Router()

router.get('/api/new/shuffle',cardController.api)
router.get('/api/:deckId/shuffle',cardController.shuffle)
router.get('/api/:deckId/draw',cardController.draw)
router.get('/:slug', (req, res, next) => {
    res.status(404).send('<h2>Not Found</h2> <p>The requested resource was not found on this server.</p>')
})
router.get('/',cardController.index)

module.exports = router