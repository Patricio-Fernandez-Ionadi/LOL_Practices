const axios = require('axios')
const { headerRequest } = require('../helpers')
const Champ = require('../models/championsModel')

const getAllChamps = async () => {
	let version = '11.23.1'
	const champs = await Champ.find({})

	if (!champs) {
		const { data } = await axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
				headerRequest
			)
			.catch((e) => ({
				allchampsError: {
					status: e.response.status,
					error: e,
				},
			}))

		for (let champ in data.data) {
			const newChamp = new Champ(data.data[champ])

			try {
				await newChamp.save()
			} catch (e) {
				console.log(e)
			}
		}
	}

	return champs
}

const getChamp = async (champName) => {
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
}

module.exports = { getAllChamps, getChamp }
