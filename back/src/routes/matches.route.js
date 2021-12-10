const { Router } = require("express")
const matchesRoute = Router()

const { matchInfo, currentMatch } = require("../controllers/matches.controller")

matchesRoute.get("/current/:summonerName", currentMatch)
matchesRoute.get("/history/:matchId", matchInfo)

module.exports = matchesRoute
