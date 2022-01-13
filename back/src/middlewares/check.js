const Champ = require('../models/championsModel')

const checkAllChampsMiddleware = async (req, res, next) => {
	const champs = await Champ.find({})

	next()
	try {
		if (!champs[0]) await setAllChamps()
	} catch (e) {
		console.log('no se pudieron setear los campeones')
	}
}

module.exports = { checkAllChampsMiddleware }
