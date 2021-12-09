const { Router } = require("express")
const matchesRoute = Router()

const { match } = require("../controllers/matches.controller")

matchesRoute.get("/:matchId", match)

module.exports = matchesRoute
