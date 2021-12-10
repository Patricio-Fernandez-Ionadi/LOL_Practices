const { Router } = require("express")
const championsRoute = Router()

const { allChamps, champion } = require("../controllers/champions.controller")

championsRoute.get("/", allChamps)
championsRoute.get("/:championName", champion)

module.exports = championsRoute
