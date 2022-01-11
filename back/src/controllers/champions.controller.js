const { getAllChamps, getChamp } = require('../services/championServices')

exports.allChamps = async (req, res) => {
	const champions = await getAllChamps()
	res.json(champions)
}

exports.champion = async (req, res) => {
	const { championName } = req.params
	const champion = await getChamp(championName)
	res.json(champion)
}
