const axios = require("axios")

const { headerRequest } = require("../helpers")
const Summoner = require("../models/summonerModel")

exports.getSummoner = {
	byName: async (summonerName) => {
		// console.log("###################### peticion byName ######################")
		const summoner = await Summoner.find({ name: summonerName })

		if (summoner[0] && summoner[0].name && summoner[0].name === summonerName) {
			// console.log("summoner from mongo 1st try")
			return summoner
		}

		const sumNameForRequest = encodeURI(summonerName)
		const summonerIds = await axios
			.get(
				`${process.env.LAS_URI}/lol/summoner/v4/summoners/by-name/${sumNameForRequest}`,
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
		console.log(summonerIds.data)

		if (summonerIds.data.name.toLowerCase() === summonerName.toLowerCase()) {
			const earlyReturnSummoner = await Summoner.find({
				id: summonerIds.data.id,
			})
			// console.log("/////////////// early return summoner ///////////////")
			// console.log(earlyReturnSummoner)
			if (earlyReturnSummoner[0] && earlyReturnSummoner[0].id) {
				// console.log("summoner from mongo in early return")
				return earlyReturnSummoner
			} else {
				// console.log("no hay early Return summoner")
			}
		}
		// console.log("summoner from api")
		const statsResponse = await axios
			.get(
				`${process.env.LAS_URI}/lol/league/v4/entries/by-summoner/${summonerIds.data.id}`,
				headerRequest
			)
			.catch((e) => ({
				getsummonerstats: {
					status: e.response.status,
					error: e,
				},
			}))

		const newSummoner = new Summoner({
			id: summonerIds.data.id,
			accountId: summonerIds.data.accountId,
			puuid: summonerIds.data.puuid,
			name: summonerIds.data.name,
			profileIconId: summonerIds.data.profileIconId,
			revisionDate: summonerIds.data.revisionDate,
			summonerLevel: summonerIds.data.summonerLevel,
			stats: {
				leagueId: statsResponse.data[0].leagueId,
				queueType: statsResponse.data[0].queueType,
				rank: statsResponse.data[0].rank,
				leaguePoints: statsResponse.data[0].leaguePoints,
				wins: statsResponse.data[0].wins,
				losses: statsResponse.data[0].losses,
				veteran: statsResponse.data[0].veteran,
				inactive: statsResponse.data[0].inactive,
				freshBlood: statsResponse.data[0].freshBlood,
				hotStreak: statsResponse.data[0].hotStreak,
			},
		})

		await newSummoner.save()
		const createdSummoner = await Summoner.find({
			id: summonerIds.data.id,
		})

		// console.log("#################### FINpeticion byName ####################")
		return createdSummoner
	},
	stats: async (summonerId) => {
		const statsResponse = await axios
			.get(
				`${process.env.LAS_URI}/lol/league/v4/entries/by-summoner/${summonerIds.data.id}`,
				headerRequest
			)
			.catch((e) => ({
				getsummonerstats: {
					status: e.status,
					data: e.data,
					error: e,
				},
			}))
		return statsResponse.data
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
