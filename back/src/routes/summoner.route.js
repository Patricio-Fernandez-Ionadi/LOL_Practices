const { Router } = require("express")
const summonerRoute = Router()

const { getSummoner } = require("../controllers/summoner.controller")

summonerRoute.get("/:summonerName", getSummoner)

module.exports = summonerRoute
