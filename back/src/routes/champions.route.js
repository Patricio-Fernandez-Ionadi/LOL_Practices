const { Router } = require('express')
const championsRoute = Router()

const { allChamps, champion } = require('../controllers/champions.controller')
const { checkAllChampsMiddleware } = require('../middlewares/check')

championsRoute.get('/', checkAllChampsMiddleware, allChamps)
// championsRoute.get('/:championId', champion)

module.exports = championsRoute
