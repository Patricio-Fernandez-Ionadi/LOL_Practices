const axios = require("axios")
const { headerRequest } = require("../helpers")

const matchTimeline = (id) => {
	return axios.get(
		`${process.env.LOL_REGION}/lol/match/v5/matches/${id}/timeline`,
		headerRequest
	)
}

const matchInfo = (id) => {
	return axios.get(
		`${process.env.LOL_REGION}/lol/match/v5/matches/${id}`,
		headerRequest
	)
}

exports.match = async (req, res) => {
	const { matchId } = req.params //LA2_1116684394
	const { data } = await matchInfo(matchId)

	return res.json(data)
}
