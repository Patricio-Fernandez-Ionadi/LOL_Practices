const { Router } = require("express")
const summonerRoute = Router()

const { summonerResume } = require("../controllers/summoner.controller")

summonerRoute.get("/:summonerName", summonerResume)

module.exports = summonerRoute
