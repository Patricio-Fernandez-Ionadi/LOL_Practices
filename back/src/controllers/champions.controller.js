const axios = require("axios")
const { headerRequest } = require("../helpers")

exports.allChamps = async (req, res) => {
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

	return res.json(data.data)
}

exports.champion = async (req, res) => {
	const { champion } = req.params

	const { data } = await axios
		.get(
			`http://ddragon.leagueoflegends.com/cdn/11.23.1/data/en_US/champion/${champion}.json`,
			headerRequest
		)
		.catch((e) => ({
			championError: {
				status: e.status,
				data: e.data,
				error: e,
			},
		}))

	return res.json(data)
}
