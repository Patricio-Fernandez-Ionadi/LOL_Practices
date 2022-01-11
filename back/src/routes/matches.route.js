const { Router } = require('express')
const matchesRoute = Router()

const { currentMatch } = require('../controllers/matches.controller')

matchesRoute.get('/current/:summonerName', currentMatch)

module.exports = matchesRoute
