require("dotenv").config()
// require("./connection")
const express = require("express")
const { json } = require("express")
const app = express()
const axios = require("axios")
const cors = require("cors")
// ---------------------------------------------------------------------
app.use(cors())
app.use(json())
// ?api_key=${process.env.API_KEY}

app.get("/", (req, res) => {
	res.send("App")
})

app.get("/summoner/:summonerName", async (req, res) => {
	const { summonerName } = req.params

	// /////////////////////////////////////////////////////////////////////////
	const summonerIdResponse = await axios
		.get(
			`${process.env.LAS_URI}/lol/summoner/v4/summoners/by-name/${encodeURI(
				summonerName
			)}`,
			{ headers: { "X-Riot-Token": process.env.API_KEY } }
		)
		.catch((e) => {
			return res.status(e.response.status).json(e.response.data)
		})
	// return res.json(summonerIdResponse.data)
	/*
	this returns:
	{
		"id": "",
		"accountId": "",
		"puuid": "",
		"name": "",
		"profileIconId": ,
		"revisionDate": ,
		"summonerLevel":
	}
	*/
	// /////////////////////////////////////////////////////////////////////////
	const { id, profileIconId, summonerLevel, puuid, accountId } =
		summonerIdResponse.data

	// /////////////////////////////////////////////////////////////////////////
	const responseRanked = await axios
		.get(`${process.env.LAS_URI}/lol/league/v4/entries/by-summoner/${id}`, {
			headers: { "X-Riot-Token": process.env.API_KEY },
		})
		.catch((e) => {
			return res.status(e.response.status).json(e.response.data)
		})

	/* 	
		return res.json(responseRanked.data)
	this returns:
	[{
		"leagueId": "",
		"queueType": "",
		"tier": "",
		"rank": "",
		"summonerId": "",
		"summonerName": "",
		"leaguePoints": ,
		"wins": ,
		"losses": ,
		"veteran": ,
		"inactive": ,
		"freshBlood": ,
		"hotStreak":
	}] */

	// /////////////////////////////////////////////////////////////////////////
	const {
		tier,
		rank,
		wins,
		losses,
		queueType,
		leaguePoints,
		leagueId,
		summonerId,
	} = responseRanked.data[0] ? responseRanked.data[0] : responseRanked.data[1]

	// /////////////////////////////////////////////////////////////////////////
	const matchesHystory = await axios
		.get(
			`${process.env.LOL_REGION}/lol/match/v5/matches/by-puuid/${puuid}/ids`,
			{
				headers: { "X-Riot-Token": process.env.API_KEY },
			}
		)
		.catch((e) => {
			return res.status(e.response.status).json(e.response.data)
		})
	/* 
		this returns: [String]
		*/

	// /////////////////////////////////////////////////////////////////////////
	const lastMatches = matchesHystory.data

	return res.json({
		id,
		lastMatches,
		summonerName,
		puuid,
		accountId,
		leaguePoints,
		leagueId,
		summonerId,
		summonerLevel,
		tier,
		rank,
		wins,
		losses,
		queueType,
		iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
		winRate: ((wins / (wins + losses)) * 100).toFixed(1),
	})
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
