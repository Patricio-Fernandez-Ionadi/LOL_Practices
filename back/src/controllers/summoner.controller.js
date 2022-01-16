const Summoner = require('../models/summonerModel')
const { getSummonerByName, getSummonerMatch } = require('../services/summoner')

exports.summonerResume = async (req, res) => {
	const { summonerName } = req.params

	try {
		const summ = await getSummonerByName(summonerName)
		res.json(summ)
	} catch (e) {
		res.json(e)
	}
}

exports.summonerHistory = async (req, res) => {
	// TODO
	// const { puuid } = req.body.user
	const { summonerName } = req.params

	const summ = await getSummonerByName(summonerName)
	// const matchList = await getSummonerHistory(summ.puuid)

	res.json(matchList)
}

exports.summonerMatch = async (req, res) => {
	const { matchId } = req.params
	const { teams, timeLine, info } = await getSummonerMatch(matchId)

	return res.json(info)
}

exports.getAllSummoners = async (req, res) => {
	const summoners = await Summoner.find({})
	return res.json(summoners)
}
