const { Router } = require('express')
const summonerRoute = Router()

const {
	summonerResume,
	summonerHistory,
	summonerMatch,
	getAllSummoners,
} = require('../controllers/summoner.controller')

summonerRoute.get('/:summonerName', summonerResume)
summonerRoute.get('/:summonerName/history', summonerHistory)
summonerRoute.get('/:summonerName/history/:matchId', summonerMatch)
summonerRoute.get('/admin/getAll', getAllSummoners)

module.exports = summonerRoute
