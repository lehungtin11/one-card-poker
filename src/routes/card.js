const cardController = require('../app/controllers/CardControllers')
const express = require('express')
const router = express.Router()

router.get('/api',cardController.api)
router.get('/',cardController.index)

module.exports = router