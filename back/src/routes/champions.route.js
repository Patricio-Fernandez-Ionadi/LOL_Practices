const { Router } = require('express')
const championsRoute = Router()

const {
	allChamps,
	champion,
	setChamps,
} = require('../controllers/champions.controller')

championsRoute.get('/', allChamps)

championsRoute.get('/set', setChamps)

module.exports = championsRoute
