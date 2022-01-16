const axios = require('axios')
const { headerRequest } = require('../helpers')

const getCurrentMatch = async (summId) => {
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
}
module.exports = { getCurrentMatch }
