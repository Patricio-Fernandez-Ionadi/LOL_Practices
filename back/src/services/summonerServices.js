const axios = require("axios")

const { headerRequest } = require("../helpers")

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
						status: e.response.status,
						error: e,
					},
				}
			})

		// console.log(data)
		return data
	},
	byId: async (summonerId) => {
		const { data } = await axios
			.get(
				`${process.env.LAS_URI}/lol/summoner/v4/summoners/${summonerId}`,
				headerRequest
			)
			.catch((e) => {
				return {
					getsummonerbyid: {
						status: e.response.status,
						response: e.response,
						error: e,
					},
				}
			})
		// console.log(data)
		return data
	},
	stats: async (summonerId) => {
		const { data } = await axios
			.get(
				`${process.env.LAS_URI}/lol/league/v4/entries/by-summoner/${summonerId}`,
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
