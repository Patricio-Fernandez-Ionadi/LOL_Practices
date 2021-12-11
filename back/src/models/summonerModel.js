const mongoose = require("mongoose")
const { model, Schema } = mongoose

const summonerSchema = new Schema({
	id: String,
	accountId: String,
	puuid: String,
	name: String,
	profileIconId: Number,
	revisionDate: Number,
	summonerLevel: Number,
	stats: {
		leagueId: String,
		queueType: String,
		tier: String,
		rank: String,
		leaguePoints: Number,
		wins: Number,
		losses: Number,
		veteran: Boolean,
		inactive: Boolean,
		freshBlood: Boolean,
		hotStreak: Boolean,
		winRate: Number,
	},
})

const Summoner = model("summoners", summonerSchema)

module.exports = Summoner
