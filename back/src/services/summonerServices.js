const axios = require('axios')

const { headerRequest } = require('../helpers')
const Summoner = require('../models/summonerModel')

const _getSummonerStats = async (userId) => {
	const statsResponse = await axios
		.get(
			`${process.env.LAS_URI}/lol/league/v4/entries/by-summoner/${userId}`,
			headerRequest
		)
		.catch((e) => ({
			_getsummonerstats: {
				status: e.status,
				data: e.data,
				error: e,
			},
		}))
	return statsResponse.data
}

const getSummonerByName = async (summonerName) => {
	const [summoner] = await Summoner.find({ name: summonerName })

	if (summoner?.id && summoner?.stats?.leagueId) {
		console.log('summoner from mongo 1st try')
		// console.log(summoner)
		return summoner
	} else if (summoner && !summoner?.stats?.leagueId) {
		const [stats] = await _getSummonerStats(summoner.id)

		if (stats) {
			const newInfo = {
				...summoner,
				stats: {
					leagueId: stats.leagueId,
					queueType: stats.queueType,
					rank: stats.rank,
					leaguePoints: stats.leaguePoints,
					wins: stats.wins,
					losses: stats.losses,
					veteran: stats.veteran,
					inactive: stats.inactive,
					freshBlood: stats.freshBlood,
					hotStreak: stats.hotStreak,
				},
			}

			const summToUpdate = await Summoner.findOneAndUpdate(
				{ id: summoner.id },
				newInfo,
				{ new: true }
			)

			console.log('updated summoner in mongo')
			return summToUpdate
		} else {
			console.log('user returned from mongo, still without stats')
			// console.log(summoner)
			return summoner
		}
	}

	const sumNameForRequest = encodeURI(summonerName)
	const { data: summonerIds } = await axios
		.get(
			`${process.env.LAS_URI}/lol/summoner/v4/summoners/by-name/${sumNameForRequest}`,
			headerRequest
		)
		.catch((e) => {
			console.log('error fetching data by Name from API')
			return {
				getsummoneridsbyname: {
					status: e.response.status,
					error: e,
				},
			}
		})

	// console.log(summonerIds)
	const { id: userId } = summonerIds

	const [newStats] = await _getSummonerStats(userId)

	if (!newStats) {
		const newSummoner = new Summoner({
			id: summonerIds.id,
			accountId: summonerIds.accountId,
			puuid: summonerIds.puuid,
			name: summonerIds.name,
			profileIconId: summonerIds.profileIconId,
			revisionDate: summonerIds.revisionDate,
			summonerLevel: summonerIds.summonerLevel,
		})
		console.log('user created without stats')
		await newSummoner.save()
		const createdSummoner = await Summoner.find({
			id: summonerIds.id,
		})
		return createdSummoner
	} else if (newStats) {
		const newSummoner = new Summoner({
			id: summonerIds.id,
			accountId: summonerIds.accountId,
			puuid: summonerIds.puuid,
			name: summonerIds.name,
			profileIconId: summonerIds.profileIconId,
			revisionDate: summonerIds.revisionDate,
			summonerLevel: summonerIds.summonerLevel,
			stats: {
				leagueId: newStats.leagueId,
				queueType: newStats.queueType,
				rank: newStats.rank,
				leaguePoints: newStats.leaguePoints,
				wins: newStats.wins,
				losses: newStats.losses,
				veteran: newStats.veteran,
				inactive: newStats.inactive,
				freshBlood: newStats.freshBlood,
				hotStreak: newStats.hotStreak,
			},
		})
		console.log('user created with stats')

		await newSummoner.save()
		const createdSummoner = await Summoner.find({
			id: summonerIds.id,
		})

		return createdSummoner
	}
}

const getSummonerHistory = async (puuid) => {
	const { data } = await axios
		.get(
			`${process.env.LOL_REGION}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
			headerRequest
		)
		.catch((err) => res.json(err))

	return data
}

// ---------------------------------------------------------------------
const matchTeams = async (matchId) => {
	const { data: info } = await axios.get(
		`${process.env.LOL_REGION}/lol/match/v5/matches/${matchId}`,
		headerRequest
	)

	const { participants } = info.info

	const blueTeamParticipants = participants.filter(
		(each) => each.teamId === 100
	)
	const redTeamParticipants = participants.filter((each) => each.teamId === 200)

	const blueTeam = {
		participants: blueTeamParticipants,
		win: blueTeamParticipants[0].win,
	}

	const redTeam = {
		participants: redTeamParticipants,
		win: redTeamParticipants[0].win,
	}
	return { blueTeam, redTeam, info }
}

const matchTimeLine = async (matchId) => {
	const { data } = await axios.get(
		`${process.env.LOL_REGION}/lol/match/v5/matches/${matchId}/timeline`,
		headerRequest
	)

	return data
}

const getSummonerMatch = async (matchId) => {
	const timeLine = await matchTimeLine(matchId)
	const { blueTeam, redTeam, info } = await matchTeams(matchId)
	const teams = { blueTeam, redTeam }

	return { teams, timeLine, info }
}

module.exports = { getSummonerByName, getSummonerHistory, getSummonerMatch }
