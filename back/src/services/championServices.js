const axios = require("axios")
const { headerRequest } = require("../helpers")
const Champs = require("../models/championsModel")

exports.champs = {
	getAll: async () => {
		const champsInformation = await Champs.find({})

		let currentVersion = "11.23.1"

		if (champsInformation[0].version === currentVersion) {
			console.log("champions data from mongo")
			return champsInformation
		}
		console.log("champions data from api")
		await Champs.deleteMany({})

		const { data } = await axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion.json`,
				headerRequest
			)
			.catch((e) => ({
				allchampsError: {
					status: e.status,
					data: e.data,
					error: e,
				},
			}))

		for (let champ in data.data) {
			const newChamp = new Champs(data.data[champ])
			try {
				await newChamp.save()
			} catch (e) {
				console.log(e)
			}
		}

		const champsUpdatedFromApi = await Champs.find({})

		return champsUpdatedFromApi
	},
	getByName: async (champName) => {
		const { data } = await axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion/${champName}.json`,
				headerRequest
			)
			.catch((e) => ({
				championError: {
					status: e.status,
					data: e.data,
					error: e,
				},
			}))

		return data
	},
}
