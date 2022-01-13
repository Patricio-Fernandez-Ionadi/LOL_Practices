const Champ = require('../models/championsModel')

exports.allChamps = async (req, res) => {
	const champs = await Champ.find({})
	return res.json(champs)
}
