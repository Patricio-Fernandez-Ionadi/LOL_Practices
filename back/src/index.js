require('dotenv').config()
require('./config/connection')

const express = require('express')
const { json } = require('express')
const app = express()

const cors = require('cors')

const summonerRoute = require('./routes/summoner.route')
const championsRoute = require('./routes/champions.route')
// ---------------------------------------------------------------------
app.use(cors())
app.use(json())
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

app.get('/', (req, res) => {
	res.json({
		application: 'LoL Practices',
		repo: 'https://github.com/Patricio-Fernandez-Ionadi/LOL_Practices',
	})
})

app.use('/summoner', summonerRoute)
app.use('/champions', championsRoute)

const { NODE_ENV } = process.env
const PORT = NODE_ENV === 'test' ? 1234 : 3001
const server = app.listen(PORT, () => {
	const routes = {
		index: `http://localhost:${PORT}`,
		getSummoner: `http://localhost:${PORT}/summoner/Éster%20Piscore`,
		getAllSummoners: `http://localhost:${PORT}/summoner/admin/getAll`,
		getSummonerHistoryIds: `http://localhost:${PORT}/summoner/Éster%20Piscore/history`,
		getSummonerSpecificMatch: `http://localhost:${PORT}/summoner/Éster%20Piscore/history/LA2_1132017706`,
		getSummonerCurrentGame: `http://localhost:${PORT}/summoner/Éster%20Piscore/getcurrentgame`,
		getAllChampions: `http://localhost:${PORT}/champions`,
		ResetChampions: `http://localhost:${PORT}/champions/set`,
		getChampion: `http://localhost:${PORT}/champions/Lucian`,
	}

	console.table(routes)
})

module.exports = { app, server }
