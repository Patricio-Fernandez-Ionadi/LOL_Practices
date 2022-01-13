const Champ = require('../models/championsModel')
const { setAllChamps } = require('../services/champions')

exports.allChamps = async (req, res) => {
	const champs = await Champ.find({})

	if (!champs[0]) {
		const response = await setAllChamps()
		console.log('no hay champs o.O, los seteamos.')
		return res.json(response)
	} else {
		console.log('champs obtenidos de mongo "allChamps" in champs.controller')
		return res.json(champs)
	}
}
