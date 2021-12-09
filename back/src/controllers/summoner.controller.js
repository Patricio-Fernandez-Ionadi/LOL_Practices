const axios = require("axios")

const { headerRequest } = require("../helpers")

const getSummonerIDsByName = async (summonerName) => {
	const name = encodeURI(summonerName)

	const { data } = await axios
		.get(
			`${process.env.LAS_URI}/lol/summoner/v4/summoners/by-name/${name}`,
			headerRequest
		)
		.catch((e) => {
			return {
				getsummoneridsbyname: {
					status: e.status,
					data: e.data,
					error: e,
				},
			}
		})
	return data
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
}

const getSummonerStats = async (id) => {
	const { data } = await axios
		.get(
			`${process.env.LAS_URI}/lol/league/v4/entries/by-summoner/${id}`,
			headerRequest
		)
		.catch((e) => ({
			getsummonerstats: {
				status: e.status,
				data: e.data,
				error: e,
			},
		}))
	return data
	/* 
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
    }] 
  */
}

const getSummonerMatches = async (puuid) => {
	const { data } = await axios
		.get(
			`${process.env.LOL_REGION}/lol/match/v5/matches/by-puuid/${puuid}/ids`,
			headerRequest
		)
		.catch((e) => ({
			getsummonermatches: {
				status: e.status,
				data: e.data,
				error: e,
			},
		}))

	return data
	/* 
  this returns: [String] 
  */
}

exports.getSummoner = async (req, res) => {
	const { summonerName } = req.params

	try {
		const sumIds = await getSummonerIDsByName(summonerName)
		const [sumStats] = await getSummonerStats(sumIds.id)
		const matches = await getSummonerMatches(sumIds.puuid)

		res.json({
			summoner: {
				...sumIds,
				iconUrl: `${process.env.LOL_ICONS}/${sumIds.profileIconId}.png`,
			},
			stats: {
				...sumStats,
				winRate: (
					(sumStats.wins / (sumStats.wins + sumStats.losses)) *
					100
				).toFixed(1),
			},
			matches,
		})
	} catch (e) {
		res.json(e)
	}
}
