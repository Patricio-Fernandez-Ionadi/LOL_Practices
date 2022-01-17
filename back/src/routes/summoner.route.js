const { Router } = require('express')
const summonerRoute = Router()

const sumCtrl = require('../controllers/summoner.controller')

summonerRoute.get('/:summonerName', sumCtrl.summonerResume)
summonerRoute.get('/:summonerName/getcurrentgame', sumCtrl.currentMatch)
summonerRoute.get('/:summonerName/history', sumCtrl.summonerHistory)
summonerRoute.get('/:summonerName/history/:matchId', sumCtrl.summonerMatch)
summonerRoute.get('/admin/getAll', sumCtrl.getAllSummoners)

module.exports = summonerRoute
