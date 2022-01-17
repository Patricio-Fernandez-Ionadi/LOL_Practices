const axios = require('axios')

const { headerRequest } = require('../config/helpers')
const { VERSION } = require('../config/constant')

const Summoner = require('../models/summonerModel')

// get a specific past match
const getSummonerMatch = async (matchId) => {
	// console.log('getSummonerMatch called')
	try {
		const { info } = await matchTeams(matchId)
		const { info: toResponse } = info
		return toResponse
	} catch (e) {
		console.log('Catch error getSummonerMatch', {
			name: e.name,
			message: e.message,
			status: e.response?.status || e.status,
		})
	}
}

// get an array with last 20 matches ids
const getSummonerHistoryIdsLeague = async (puuid) => {
	// console.log('_getSummonerHistoryLeague called')
	try {
		const { data } = await axios.get(
			`${process.env.LOL_REGION}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`,
			headerRequest
		)
		return data
	} catch (e) {
		console.log('Catch error getSummonerHistoryIdsLeague ', {
			name: e.name,
			message: e.message,
			error: e,
		})
	}
}

// get the current summoner's rift game info (if summoner is in game)
const getCurrentMatch = async (summId) => {
	// console.log('##############################')
	// console.log('getCurrentMatch called')

	try {
		const { data } = await axios.get(
			`${process.env.LAS_URI}/lol/spectator/v4/active-games/by-summoner/${summId}`,
			headerRequest
		)
		return data
	} catch (e) {
		console.log('Error getCurrentMatch', {
			status: e.status || e.response?.status,
			name: e.name,
			message: e.message,
			error: e,
		})
	}
	// console.log('getCurrentMatch finished')
	// console.log('##############################')
}

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

/** get summoner ids for a given summoner name
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
	// console.log('##############################')
	// console.log('_getSummonerByName called')

	try {
		const { data } = await axios.get(
			`${process.env.LAS_URI}/lol/summoner/v4/summoners/by-name/${summonerName}`,
			headerRequest
		)
		return data
	} catch (e) {
		console.log('Error _getSummonerByName', {
			name: e.name,
			status: e.status || e.response?.status,
			error: e,
		})
	}
	// console.log('_getSummonerByName finished')
	// console.log('##############################')
}

/** get summoner rank stats (if exsist) for a given summoner encryptedId
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
	try {
		const { data } = await axios.get(
			`${process.env.LAS_URI}/lol/league/v4/entries/by-summoner/${summonerId}`,
			headerRequest
		)
		return data
	} catch (e) {
		console.log('######### Error _getSummonerStatsLeague #########', {
			name: e.name,
			status: e.status || e.response?.status,
			message: e.message,
			error: e,
		})
	}
	// console.log('_getSummonerStatsLeague finished')
	// console.log('#######################################')
}

/** take a summoner and ask for its stats, save them if exist or return previuous object
 *
 * @param {encryptedId} summonerId summoner encryptedId
 * @returns previous summoner + stats property
 */
const _updateSummonerStatsLeague = async (summonerId) => {
	// console.log('_updateSummonerStatsLeague called')

	try {
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
	} catch (e) {
		console.log('######### Error _updateSummonerStatsLeague #########', {
			name: e.name,
			status: e.status || e.response?.status,
			message: e.message,
			error: e,
		})
	}
	// console.log('_updateSummonerStatsLeague finished')
	// console.log('#######################################')
}

/** creates a summoner with its ids and stats (if exist)
 *
 * @param {String} summonerName name of the summoner
 * @returns summoner ids + stats (if exist)
 */
const _createNewSummoner = async (summonerName) => {
	// console.log('_createNewSummoner called')
	const sumNameForRequest = encodeURI(summonerName)

	try {
		const summonerIds = await _getSummonerByName(sumNameForRequest)
		const { id } = summonerIds
		const [newStats] = await _getSummonerStatsLeague(id)

		if (!newStats) {
			const newSummoner = new Summoner({
				id: summonerIds.id,
				accountId: summonerIds.accountId,
				puuid: summonerIds.puuid,
				name: summonerIds.name,
				summonerName: summonerIds.name,
				profileIconId: summonerIds.profileIconId,
				profileIconUrl: `http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/profileicon/${summonerIds.profileIconId}.png`,
				revisionDate: summonerIds.revisionDate,
				summonerLevel: summonerIds.summonerLevel,
			})
			console.log('summoner created without stats')
			await newSummoner.save()
			const [createdSummoner] = await Summoner.find({ id })
			return createdSummoner
		} else if (newStats) {
			const newSummoner = new Summoner({
				id,
				accountId: summonerIds.accountId,
				puuid: summonerIds.puuid,
				name: summonerIds.name,
				summonerName: summonerIds.name,
				profileIconId: summonerIds.profileIconId,
				profileIconUrl: `http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/profileicon/${summonerIds.profileIconId}.png`,
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
			const [createdSummoner] = await Summoner.find({ id })
			return createdSummoner
		}
	} catch (error) {
		console.log('######### Error _createNewSummoner #########', {
			name: e.name,
			status: e.status || e.response?.status,
			message: e.message,
			error: e,
		})
	}

	// console.log('_createNewSummoner finished')
	// console.log('#######################################')
}

/** obtain a summoner from mongo, update it (if possible), or create a new one
 *
 * @param {String} summonerName summoner name
 * - try to get the summoner with full info from mongo
 * - in case summoner exist but has no information form stats, try to update that info
 * - in case summoner does not exist, create it
 * @returns summoner object with ids and maybe stats... xD
 */
const getSummonerByName = async (summonerName) => {
	console.log('getSummonerByName called')
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

// ROUTE: /summoner/:summonerName GET
exports.summonerResume = async (req, res) => {
	const { summonerName } = req.params

	try {
		const summ = await getSummonerByName(summonerName)
		res.json(summ)
	} catch (e) {
		res.json(e)
	}
}

// ROUTE: /summoner/:summonerName/history GET
exports.summonerHistory = async (req, res) => {
	// TODO
	const { summonerName } = req.params

	const summ = await getSummonerByName(summonerName)
	const matchList = await getSummonerHistoryIdsLeague(summ.puuid)

	const matches = await recopileAllInfoOfaHistoryList(matchList)

	res.json(matches)
}

// ROUTE: /summoner/:summonerName/history/:matchId GET
exports.summonerMatch = async (req, res) => {
	const { matchId } = req.params
	const { /* teams, */ /* timeLine, */ info } = await getSummonerMatch(matchId)

	return res.json({
		// teams,
		// timeLine,
		info,
	})
}

// ROUTE: /summoner/admin/getAll GET
exports.getAllSummoners = async (req, res) => {
	const summoners = await Summoner.find({})
	return res.json(summoners)
}

// ROUTE: /summoner/:summonerName/getcurrentgame GET
exports.currentMatch = async (req, res) => {
	const { summonerName } = req.params

	try {
		const { id } = await getSummonerByName(summonerName)
		const current = await getCurrentMatch(id)

		// // GUARDADO DE SUMMONERS
		const sum1 = await getSummonerByName(current.participants[0].summonerName)
		const sum2 = await getSummonerByName(current.participants[1].summonerName)
		const sum3 = await getSummonerByName(current.participants[2].summonerName)
		const sum4 = await getSummonerByName(current.participants[3].summonerName)
		const sum5 = await getSummonerByName(current.participants[4].summonerName)
		const sum6 = await getSummonerByName(current.participants[5].summonerName)
		const sum7 = await getSummonerByName(current.participants[6].summonerName)
		const sum8 = await getSummonerByName(current.participants[7].summonerName)
		const sum9 = await getSummonerByName(current.participants[8].summonerName)
		const sum10 = await getSummonerByName(current.participants[9].summonerName)

		// Obtencion de baneos
		const ban1 = current.bannedChampions[0] || null
		const ban2 = current.bannedChampions[1] || null
		const ban3 = current.bannedChampions[2] || null
		const ban4 = current.bannedChampions[3] || null
		const ban5 = current.bannedChampions[4] || null
		const ban6 = current.bannedChampions[5] || null
		const ban7 = current.bannedChampions[6] || null
		const ban8 = current.bannedChampions[7] || null
		const ban9 = current.bannedChampions[8] || null
		const ban10 = current.bannedChampions[9] || null

		const blueTeam = {
			bans: [ban1, ban2, ban3, ban4, ban5],
			participants: [
				{
					...sum1._doc,
					ban: ban1,
					spells: [
						current.participants[0].spell1Id,
						current.participants[0].spell2Id,
					],
					champ: current.participants[0].championId,
				},
				{
					...sum2._doc,
					ban: ban2,
					spells: [
						current.participants[1].spell1Id,
						current.participants[1].spell2Id,
					],
					champ: current.participants[1].championId,
				},
				{
					...sum3._doc,
					ban: ban3,
					spells: [
						current.participants[2].spell1Id,
						current.participants[2].spell2Id,
					],
					champ: current.participants[2].championId,
				},
				{
					...sum4._doc,
					ban: ban4,
					spells: [
						current.participants[3].spell1Id,
						current.participants[3].spell2Id,
					],
					champ: current.participants[3].championId,
				},
				{
					...sum5._doc,
					ban: ban5,
					spells: [
						current.participants[4].spell1Id,
						current.participants[4].spell2Id,
					],
					champ: current.participants[4].championId,
				},
			],
		}

		const redTeam = {
			bans: [ban6, ban7, ban8, ban9, ban10],
			participants: [
				{
					...sum6._doc,
					ban: ban6,
					spells: [
						current.participants[5].spell1Id,
						current.participants[5].spell2Id,
					],
					champ: current.participants[5].championId,
				},
				{
					...sum7._doc,
					ban: ban7,
					spells: [
						current.participants[6].spell1Id,
						current.participants[6].spell2Id,
					],
					champ: current.participants[6].championId,
				},
				{
					...sum8._doc,
					ban: ban8,
					spells: [
						current.participants[7].spell1Id,
						current.participants[7].spell2Id,
					],
					champ: current.participants[7].championId,
				},
				{
					...sum9._doc,
					ban: ban9,
					spells: [
						current.participants[8].spell1Id,
						current.participants[8].spell2Id,
					],
					champ: current.participants[8].championId,
				},
				{
					...sum10._doc,
					ban: ban10,
					spells: [
						current.participants[9].spell1Id,
						current.participants[9].spell2Id,
					],
					champ: current.participants[9].championId,
				},
			],
		}
		return res.json({ blueTeam, redTeam })
	} catch (e) {
		console.log(e.status)
		console.log(e)
	}
}
