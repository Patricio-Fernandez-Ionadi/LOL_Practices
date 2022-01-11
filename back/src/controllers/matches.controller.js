const { getMatch } = require('../services/matchServices')
const { getSummoner } = require('../services/summonerServices')

exports.currentMatch = async (req, res) => {
	const { summonerName } = req.params
	const { id } = await getSummoner.byName(summonerName)
	const current = await getMatch.current(id)

	return res.json(current)
}
