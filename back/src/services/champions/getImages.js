const axios = require('axios')

let version = '11.23.1'
const _obtainSplashesUrl = async (champId, skines) => {
	let toResponse = []
	for (let skin of skines) {
		let response = await axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champId}_${skin.num}.jpg`
			)
			.catch((e) => {
				const Error = {
					custom: `an error ocurred making api request for a splash: ${skin.num} champ: ${champId}`,
					status: e.status,
					// message: e.message,
					// error: e,
				}
				return Error
			})
		toResponse = [...toResponse, response.config?.url || 'undefined']
	}
	return Promise.all(toResponse) || response
}

const _obtainLoadingUrl = async (champId, skines) => {
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
}

const _obtainSpellsUrl = async (spells, champId) => {
	let toResponse = []
	for (let spell of spells) {
		let response = await axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`
			)
			.catch((e) => {
				const Error = {
					custom: `an error ocurred making api request for spell: ${spell.id} champ: ${champId}`,
					status: e.status,
					// message: e.message,
					// error: e,
				}
				return Error
			})
		toResponse = [...toResponse, response.config?.url || 'undefined']
	}
	return Promise.all(toResponse) || response
}

const _obtainAvatarUrl = async (champId) => {
	const response = await axios
		.get(
			`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champId}.png`
		)
		.catch((e) => {
			const Error = {
				custom: `an error ocurred making api request for champ avatar: ${champId}`,
				status: e.status,
				// message: e.message,
				// error: e,
			}
			return Error
		})

	const url = response.config?.url || 'undefined'
	return url
}

const _obtainPassiveUrl = async (passiveD, champId) => {
	const response = await axios
		.get(
			`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${passiveD}`
		)
		.catch((e) => {
			const Error = {
				custom: `an error ocurred making api request for champ passive: ${champId} (${passiveD})`,
				status: e.status,
				// message: e.message,
				// error: e,
			}
			return Error
		})

	const url = response.config?.url || 'undefined'
	return url
}

const getChampImages = async (champId, skines, spells, passiveD) => {
	let splash = await _obtainSplashesUrl(champId, skines)
	// splash[url]

	let loading = await _obtainLoadingUrl(champId, skines)
	// loading[url]

	let spell = await _obtainSpellsUrl(spells, champId)
	// spell[url]

	const avatar = await _obtainAvatarUrl(champId)
	// avatar[url]

	const passive = await _obtainPassiveUrl(passiveD, champId)
	// passive[url]

	const images = {
		loading,
		avatar,
		splash,
		passive,
		spell,
	}
	return images
}

module.exports = { getChampImages }
