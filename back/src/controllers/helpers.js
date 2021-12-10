const axios = require("axios")

const { headerRequest } = require("../helpers")

const createTeams = (players) => {
	let blueTeam = {
		participants: [],
		teamId: 100,
		kills: 0,
		assists: 0,
		deaths: 0,
		win: false,
	}
	let redTeam = {
		participants: [],
		teamId: 200,
		kills: 0,
		assists: 0,
		deaths: 0,
		win: false,
	}
	players.map((player) => {
		const { teamId, kills, assists, deaths, win } = player
		if (teamId === 100) {
			blueTeam.participants.push(player)
			blueTeam.kills += kills
			blueTeam.assists += assists
			blueTeam.deaths += deaths
			blueTeam.win = win
		} else if (teamId === 200) {
			redTeam.participants.push(player)
			redTeam.kills += kills
			redTeam.assists += assists
			redTeam.deaths += deaths
			redTeam.win = win
		} else {
			console.log(player.teamId)
		}
	})
	return { redTeam, blueTeam }
}

exports.getSummoner = {
	byName: async (summonerName) => {
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

		// console.log(data)
		return data
	},
	byId: async (id) => {
		const summoner = await axios
			.get(
				`${process.env.LAS_URI}/lol/summoner/v4/summoners/${id}`,
				headerRequest
			)
			.catch((e) => {
				return {
					setsummonerbyid: {
						status: e.status,
						data: e.data,
						error: e,
					},
				}
			})
		console.log(summoner)
		return summoner
	},
	stats: async (id) => {
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
	},
}

exports.getMatch = {
	history: async (puuid) => {
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
	},
	teams: (matchId) => {
		return axios
			.get(
				`${process.env.LOL_REGION}/lol/match/v5/matches/${matchId}`,
				headerRequest
			)
			.then((res) => {
				const { participants } = res.data.info
				return createTeams(participants)
			})
	},
	timeLineOf: (matchId) => {
		return axios.get(
			`${process.env.LOL_REGION}/lol/match/v5/matches/${matchId}/timeline`,
			headerRequest
		)
	},
	info: (matchId) => {
		return axios.get(
			`${process.env.LOL_REGION}/lol/match/v5/matches/${matchId}`,
			headerRequest
		)
	},
	current: (puuid) => {
		return axios.get(
			`${process.env.LAS_URI}/lol/spectator/v4/active-games/by-summoner/${puuid}`,
			headerRequest
		)
	},
}
