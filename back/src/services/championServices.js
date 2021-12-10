const axios = require("axios")
const { headerRequest } = require("../helpers")

exports.champs = {
	getAll: async () => {
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

		return data
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
