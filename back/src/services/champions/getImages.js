let version = '11.23.1'

const getAllSplashesUrls = (champion) => {
	const splashes = champion.skins.map(
		(e) =>
			`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${e.num}.jpg`
	)
	return splashes
}

const getAllLoadingUrls = (champion) => {
	const loading = champion.skins.map(
		(e) =>
			`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_${e.num}.jpg`
	)
	return loading
}

const getAllSpellsUrls = (champion) => {
	const spells = champion.spells.map(
		(e) =>
			`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${e.id}.png`
	)
	return spells
}

const getChampImages = (champion) => {
	const splashes = getAllSplashesUrls(champion)
	const loadings = getAllLoadingUrls(champion)
	const spells = getAllSpellsUrls(champion)
	const avatar = `http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.id}.png`
	// avatar[url]

	const passive = `http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champion.passive.image.full}`
	// passive[url]

	const images = {
		loadings,
		avatar,
		splashes,
		passive,
		spells,
	}
	return images
}

module.exports = { getChampImages }

/* const _obtainLoadingUrl = async (champId, skines) => {
	let toResponse = []
	for (let skin of skines) {
		let response = await axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champId}_${skin.num}.jpg`
			)
			.catch((e) => {
				const Error = {
					custom: `an error ocurred making api request for loading: ${skin.num} champ: ${champId}`,
					status: e.status,
					// message: e.message,
					// error: e,
				}
				return Error
			})
		toResponse = [...toResponse, response.config?.url || 'undefined']
	}

	return Promise.all(toResponse) || response
} */
