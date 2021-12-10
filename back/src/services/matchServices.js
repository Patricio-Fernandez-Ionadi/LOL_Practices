const axios = require("axios")

const { headerRequest } = require("../helpers")

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
	current: async (summId) => {
		const { data } = await axios
			.get(
				`${process.env.LAS_URI}/lol/spectator/v4/active-games/by-summoner/${summId}`,
				headerRequest
			)
			.catch((e) => {
				return {
					currentBysummonerId: {
						status: e.response.status,
						error: e,
					},
				}
			})
		// console.log(data)
		return data
	},
}
