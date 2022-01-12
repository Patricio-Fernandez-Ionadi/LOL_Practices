const axios = require('axios')
const { headerRequest } = require('../helpers')
const Champ = require('../models/championsModel')
let version = '11.23.1'
let language = 'es_AR'

const getAllChamps = async () => {
	const [champs] = await Champ.find({})

	if (!champs) {
		const { data } = await axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`,
				headerRequest
			)
			.catch((e) => ({
				allchampsError: {
					status: e.response.status,
					error: e,
				},
			}))

		for (let champ in data.data) {
			const newChamp = new Champ(data.data[champ])

			try {
				await newChamp.save()
			} catch (e) {
				console.log(e)
			}
		}
		// console.log(champs)
	}
	const updatedChamps = await Champ.find({})

	return updatedChamps
}

const getChamp = async (champName) => {
	const { data } = await axios
		.get(
			`http://ddragon.leagueoflegends.com/cdn/11.23.1/data/${language}/champion/${champName}.json`,
			headerRequest
		)
		.catch((e) => ({
			championError: {
				status: e.status,
				data: e.data,
				error: e,
			},
		}))

	return data
}

// ---------------------------------------------------------

const _obtainSplashesUrl = async (champName, skines) => {
	let toResponse = []
	for (let skin of skines) {
		let response = await axios.get(
			`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_${skin.num}.jpg`
		)
		toResponse = [...toResponse, response.config.url]
	}
	return Promise.all(toResponse)
}

const _obtainLoadingUrl = async (champName, skines) => {
	let toResponse = []
	for (let skin of skines) {
		let response = await axios.get(
			`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champName}_${skin.num}.jpg`
		)
		toResponse = [...toResponse, response.config.url]
	}
	return Promise.all(toResponse)
}

const _obtainSpellsUrl = async (spells) => {
	let toResponse = []
	for (let spell of spells) {
		let response = await axios.get(
			`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.id}.png`
		)
		toResponse = [...toResponse, response.config.url]
	}
	return Promise.all(toResponse)
}

const getChampImages = async (champName, skines, spells, passiveD) => {
	let splash = await _obtainSplashesUrl(champName, skines)
	// console.log(splash, 'splash')

	let loading = await _obtainLoadingUrl(champName, skines)
	// console.log(loading, 'splash')

	let spell = await _obtainSpellsUrl(spells)
	// console.log(spell, 'splash')

	const { config: avatarUrl } = await axios.get(
		`http://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champName}.png`
	)
	const { url: avatar } = avatarUrl

	const { config: passiveUrl } = await axios.get(
		`http://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${passiveD}`
	)
	const { url: passive } = passiveUrl

	return {
		loading,
		avatar,
		splash,
		passive,
		spell,
	}
}

module.exports = { getAllChamps, getChamp, getChampImages }
