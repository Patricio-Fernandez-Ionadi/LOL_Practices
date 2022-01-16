require('dotenv').config()
require('./connection')

const express = require('express')
const { json } = require('express')
const app = express()

const cors = require('cors')

const summonerRoute = require('./routes/summoner.route')
const championsRoute = require('./routes/champions.route')
const matchesRoute = require('./routes/matches.route')
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
app.use('/matches', matchesRoute)
app.use('/champions', championsRoute)

const { NODE_ENV } = process.env
const PORT = NODE_ENV === 'test' ? 1234 : 3001
const server = app.listen(PORT, () => {
	const routes = {
		index: `http://localhost:${PORT}`,
		summoner: `http://localhost:${PORT}/summoner/:summonerName`,
		summonerAll: `http://localhost:${PORT}/summoner/admin/getAll`,
		summoner_history: `http://localhost:${PORT}/summoner/:summonerName/history`,
		summoner_match: `http://localhost:${PORT}/summoner/:summonerName/history/:matchId`,
		matches: `http://localhost:${PORT}/matches`,
		champions: `http://localhost:${PORT}/champions`,
		championsReset: `http://localhost:${PORT}/champions/set`,
		champion_detail: `http://localhost:${PORT}/champions/:champion`,
	}

	console.table(routes)
})

module.exports = { app, server }
