const axios = require('axios')

const { headerRequest } = require('../helpers')
const Summoner = require('../models/summonerModel')

/**
 *
 * @param {String} summonerId id del summoner recibido en la busqueda por nombre
 * @returns object {
 * leagueId,
 * summonerId,
 * summonerName,
 * queueType,
 * tier,
 * rank,
 * leaguePoints,
 * wins,
 * losses,
 * hotStreak,
 * veteran,
 * freshBlood,
 * inactive
 * }
 */
const _getSummonerStatsLeague = async (summonerId) => {
	// console.log('_getSummonerStatsLeague called')
	const { data } = await axios
		.get(
			`${process.env.LAS_URI}/lol/league/v4/entries/by-summoner/${summonerId}`,
			headerRequest
		)
		.catch((e) => {
			console.log(e.status, e)
		})
	return data
}

const _getSummonerStatsTft = async (summonerId) => {
	const { data } = await axios
		.get(
			`${process.env.LAS_URI}/tft/league/v1/entries/by-summoner/${summonerId}`,
			headerRequest
		)
		.catch((e) => {
			console.log(e.status, e)
		})
	return data
}

/**
 * 
 * @param {String} summonerName summoner name prepared for query
 * @returns {
  id ,
  accountId,
  puuid,
  name,
  profileIconId,
  revisionDate,
  summonerLevel
}
 */
const _getSummonerByName = async (summonerName) => {
	// console.log('_getSummonerByName called')
	const { data } = await axios
		.get(
			`${process.env.LAS_URI}/lol/summoner/v4/summoners/by-name/${summonerName}`,
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
	return data
}

const _getSummonerHistoryLeague = async (puuid) => {
	// console.log('_getSummonerHistoryLeague called')
	const { data } = await axios
		.get(
			`${process.env.LOL_REGION}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
			headerRequest
		)
		.catch((err) => res.json(err))

	return data
}

const _createNewSummoner = async (summonerName) => {
	// console.log('_createNewSummoner called')
	const sumNameForRequest = encodeURI(summonerName)
	const summonerIds = await _getSummonerByName(sumNameForRequest)
	const { id } = summonerIds
	const [newStats] = await _getSummonerStatsLeague(id)

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
		console.log('summoner created without stats')
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
				tier: newStats.tier,
				wins: newStats.wins,
				losses: newStats.losses,
				veteran: newStats.veteran,
				inactive: newStats.inactive,
				freshBlood: newStats.freshBlood,
				hotStreak: newStats.hotStreak,
			},
		})
		console.log('summoner created with stats')

		await newSummoner.save()
		const createdSummoner = await Summoner.find({
			id: summonerIds.id,
		})

		return createdSummoner
	}
}

const _updateSummonerStatsLeague = async (summonerId) => {
	// console.log('_updateSummonerStatsLeague called')
	const [summoner] = await Summoner.find({ id: summonerId })
	const [stats] = await _getSummonerStatsLeague(summonerId)

	if (stats) {
		const newInfo = {
			...summoner,
			stats: {
				leagueId: stats.leagueId,
				queueType: stats.queueType,
				rank: stats.rank,
				tier: stats.tier,
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
		console.log('summoner returned still without stats')
		// console.log(summoner)
		return summoner
	}
}
// ---------------------------------------------------------------------

/**
 *
 * @param {String} summonerName summoner name
 * - try to get the summoner with full info from mongo
 * - in case summoner exist but has no information form stats, try to update that info
 * - in case summoner does not exist, create it
 * @returns summoner object with ids and maybe stats... xD
 */
const getSummonerByName = async (summonerName) => {
	// console.log('getSummonerByName called')
	const [summoner] = await Summoner.find({ name: summonerName })
	if (summoner?.id && summoner?.stats?.leagueId) {
		console.log('summoner from mongo 1st try')
		return summoner
	} else if (summoner && !summoner?.stats?.leagueId) {
		console.log('summoner being updated')
		const updatedSummoner = await _updateSummonerStatsLeague(summoner.id)
		return updatedSummoner
	} else if (!summoner || !summoner.id) {
		console.log('summoner being created')
		const newSummoner = await _createNewSummoner(summonerName)
		return newSummoner
	}
}

// ---------------------------------------------------------------------
// create match teams from a past match id
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

// get a specific past match
const getSummonerMatch = async (matchId) => {
	const timeLine = await matchTimeLine(matchId)
	const { blueTeam, redTeam, info } = await matchTeams(matchId)
	const teams = { blueTeam, redTeam }

	return { teams, timeLine, info }
}

module.exports = { getSummonerByName, getSummonerMatch }
