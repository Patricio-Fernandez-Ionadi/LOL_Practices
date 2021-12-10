const { getSummoner, getMatch } = require("./helpers")

exports.summonerResume = async (req, res) => {
	const { summonerName } = req.params

	try {
		const sumIds = await getSummoner.byName(summonerName)
		const [sumStats] = await getSummoner.stats(sumIds.id)
		const matches = await getMatch.history(sumIds.puuid)

		res.json({
			summoner: {
				...sumIds,
				iconUrl: `${process.env.LOL_ICONS}/${sumIds.profileIconId}.png`,
			},
			stats: {
				...sumStats,
				winRate: (
					(sumStats.wins / (sumStats.wins + sumStats.losses)) *
					100
				).toFixed(1),
			},
			matches,
		})
	} catch (e) {
		res.json(e)
	}
}
