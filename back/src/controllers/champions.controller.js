const Champ = require('../models/championsModel')
const { setAllChamps } = require('../services/champions')

exports.allChamps = async (req, res) => {
	const champs = await Champ.find({})
	return res.json(champs)
}

exports.setChamps = async (req, res) => {
	await setAllChamps()
	res.status(201)
}
