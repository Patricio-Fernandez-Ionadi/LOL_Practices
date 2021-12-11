const { getSummoner } = require("../services/summonerServices")

exports.summonerResume = async (req, res) => {
	const { summonerName } = req.params

	try {
		const [summ] = await getSummoner.byName(summonerName)
		// console.log("----------------------------")
		// console.log(summ)
		// console.log("----------------------------")
		res.json(summ)
	} catch (e) {
		res.json(e)
	}
}
