const { getSummonerByName, getCurrentMatch } = require('../services/summoner')

exports.currentMatch = async (req, res) => {
	const { summonerName } = req.params

	try {
		const { id } = await getSummonerByName(summonerName)
		const current = await getCurrentMatch(id)

		// // GUARDADO DE SUMMONERS
		const sum1 = await getSummonerByName(current.participants[0].summonerName)
		const sum2 = await getSummonerByName(current.participants[1].summonerName)
		const sum3 = await getSummonerByName(current.participants[2].summonerName)
		const sum4 = await getSummonerByName(current.participants[3].summonerName)
		const sum5 = await getSummonerByName(current.participants[4].summonerName)
		const sum6 = await getSummonerByName(current.participants[5].summonerName)
		const sum7 = await getSummonerByName(current.participants[6].summonerName)
		const sum8 = await getSummonerByName(current.participants[7].summonerName)
		const sum9 = await getSummonerByName(current.participants[8].summonerName)
		const sum10 = await getSummonerByName(current.participants[9].summonerName)

		// Obtencion de baneos
		const ban1 = current.bannedChampions[0] || null
		const ban2 = current.bannedChampions[1] || null
		const ban3 = current.bannedChampions[2] || null
		const ban4 = current.bannedChampions[3] || null
		const ban5 = current.bannedChampions[4] || null
		const ban6 = current.bannedChampions[5] || null
		const ban7 = current.bannedChampions[6] || null
		const ban8 = current.bannedChampions[7] || null
		const ban9 = current.bannedChampions[8] || null
		const ban10 = current.bannedChampions[9] || null

		const blueTeam = {
			bans: [ban1, ban2, ban3, ban4, ban5],
			participants: [
				{
					...sum1._doc,
					ban: ban1,
					spells: [
						current.participants[0].spell1Id,
						current.participants[0].spell2Id,
					],
					champ: current.participants[0].championId,
				},
				{
					...sum2._doc,
					ban: ban2,
					spells: [
						current.participants[1].spell1Id,
						current.participants[1].spell2Id,
					],
					champ: current.participants[1].championId,
				},
				{
					...sum3._doc,
					ban: ban3,
					spells: [
						current.participants[2].spell1Id,
						current.participants[2].spell2Id,
					],
					champ: current.participants[2].championId,
				},
				{
					...sum4._doc,
					ban: ban4,
					spells: [
						current.participants[3].spell1Id,
						current.participants[3].spell2Id,
					],
					champ: current.participants[3].championId,
				},
				{
					...sum5._doc,
					ban: ban5,
					spells: [
						current.participants[4].spell1Id,
						current.participants[4].spell2Id,
					],
					champ: current.participants[4].championId,
				},
			],
		}

		const redTeam = {
			bans: [ban6, ban7, ban8, ban9, ban10],
			participants: [
				{
					...sum6._doc,
					ban: ban6,
					spells: [
						current.participants[5].spell1Id,
						current.participants[5].spell2Id,
					],
					champ: current.participants[5].championId,
				},
				{
					...sum7._doc,
					ban: ban7,
					spells: [
						current.participants[6].spell1Id,
						current.participants[6].spell2Id,
					],
					champ: current.participants[6].championId,
				},
				{
					...sum8._doc,
					ban: ban8,
					spells: [
						current.participants[7].spell1Id,
						current.participants[7].spell2Id,
					],
					champ: current.participants[7].championId,
				},
				{
					...sum9._doc,
					ban: ban9,
					spells: [
						current.participants[8].spell1Id,
						current.participants[8].spell2Id,
					],
					champ: current.participants[8].championId,
				},
				{
					...sum10._doc,
					ban: ban10,
					spells: [
						current.participants[9].spell1Id,
						current.participants[9].spell2Id,
					],
					champ: current.participants[9].championId,
				},
			],
		}
		return res.json({ blueTeam, redTeam })
	} catch (e) {
		console.log(e.status)
		console.log(e)
	}
}
