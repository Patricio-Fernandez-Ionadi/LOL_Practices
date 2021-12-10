const { champs } = require("../services/championServices")

exports.allChamps = async (req, res) => {
	const champions = await champs.getAll()
	// console.log(champions)
	res.json(champions)
}

exports.champion = async (req, res) => {
	const { championName } = req.params
	const champion = await champs.getByName(championName)
	res.json(champion)
}
