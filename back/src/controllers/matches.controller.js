const { getMatch } = require("./helpers")

exports.matchInfo = async (req, res) => {
	const { matchId } = req.params //LA2_1116684394

	try {
		const { data } = await getMatch.info(matchId)
		const teams = await getMatch.teams(matchId)
		return res.json({
			participantsPuuids: data.metadata.participants,
			teams,
		})
	} catch (e) {
		res.json(e)
	}
}

exports.currentMatch = async (req, res) => {}
