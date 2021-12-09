require("dotenv").config()

const express = require("express")
const { json } = require("express")
const app = express()

const cors = require("cors")

const summonerRoute = require("./routes/summoner.route")
const championsRoute = require("./routes/champions.route")
const matchesRoute = require("./routes/matches.route")
// ---------------------------------------------------------------------
app.use(cors())
app.use(json())
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

app.get("/", (req, res) => {
	res.send("App")
})

app.use("/summoner", summonerRoute)
app.use("/champions", championsRoute)
app.use("/matches", matchesRoute)

const { NODE_ENV } = process.env
const PORT = NODE_ENV === "test" ? 1234 : 3001
const server = app.listen(PORT, () =>
	console.log(`Server running on port ${PORT}`)
)

module.exports = { app, server }
