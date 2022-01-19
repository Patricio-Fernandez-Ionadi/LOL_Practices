const axios = require('axios')

const Champ = require('../models/championsModel')

const { VERSION, LANGUAGE } = require('../config/constant')
const { headerRequest } = require('../config/helpers')

const _generateAvatarUrl = () => {
	const baseURL = `http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/`
	return (champ) => `${baseURL}${champ}.png`
}

const _genetartePassiveUrl = () => {
	const baseURL = `http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/passive/`
	return (passive) => `${baseURL}${passive}`
}

const getAllSplashesUrls = (champion) => {
	return champion.skins.map(
		(e) =>
			`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_${e.num}.jpg`
	)
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
			`http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/spell/${e.id}.png`
	)
	return spells
}

/** object with url of images from a specific champ
 *
 * @param {Object} champion campeon con informacion detallada
 * @returns {
 * 	loadings: [urls...],
 * 	splashes: [urls...],
 * 	loading: [urls...],
 * 	avatar: String,
 * 	passive: String
 * }
 */
const createChampImagesUrls = (champion) => {
	const getAvatar = _generateAvatarUrl()
	const getPassive = _genetartePassiveUrl()

	const splashes = getAllSplashesUrls(champion)
	const loadings = getAllLoadingUrls(champion)
	const spells = getAllSpellsUrls(champion)

	const avatar = getAvatar(champion.id)
	const passive = getPassive(champion.passive.image.full)

	return {
		loadings,
		avatar,
		splashes,
		passive,
		spells,
	}
}

// ------------------------------------------------------------------------

/** objeto con los campeones con informacion general
 * devuelve un array de dos posiciones con informacion basica sobre los campeones segun la version y el lenguage
 * @returns [champions: {}, champsIds: [String]]
 *
 *  - primera posicion retorna un objeto con properties que son el nombre del campeon y el valor que es informacion general del mismo
 *  -	segunda posicion retorna un array con todas las ids de los campeones
 */
const _askForGeneralChampsInfo = async () => {
	try {
		const { data: firstApiCall } = await axios.get(
			`http://ddragon.leagueoflegends.com/cdn/${VERSION}/data/${LANGUAGE}/champion.json`,
			headerRequest
		)

		const championsInfoG = firstApiCall.data
		const champsIds = Array.from(Object.keys(championsInfoG))

		return [championsInfoG, champsIds]
	} catch (e) {
		console.warn(
			'Catch Error champions.controller -> _askForGeneralChampsInfo',
			{
				name: e.name,
				custom_name: 'API No response',
				custom_message:
					'an error ocrred while trying to get champion.json from Api',
				message: e.message,
				error: e,
				status: 444,
			}
		)
	}
}

/** objeto con informacion detallada de un champ
 * devuelve informacion detallada de un campeon especifico
 * @param {String} champId Id del campeon a buscar (nombre sin espacios ni caracteres extraños)
 * @returns {Object} Informacion detallada de un campeon especifico
 */
const _askForSpecificChampInfo = async (champId) => {
	try {
		const { data } = await axios.get(
			`http://ddragon.leagueoflegends.com/cdn/11.23.1/data/${LANGUAGE}/champion/${champId}.json`,
			headerRequest,
			{ timeout: 1000 }
		)

		return data.data[champId]
	} catch (e) {
		let message =
			typeof e.response !== 'undefined' ? e.response.data.message : e.message
		console.warn(
			'Catch Error champions.controller -> _askForSpecificChampInfo',
			{
				name: e.name,
				// custom_name: '',
				custom_message:
					'an error ocrred while trying to get specific champion from Api',
				message,
				error: e,
				url: e.config.url,
			}
		)
	}
}

/** undefined
 * - elimina toda la informacion en la coleccion de campeones
 * - solicita la lista de campeones con informacion basica y sus respectivas ids
 * - por cada campeon intentará:
 * --	solicitar informacion especifica
 * -- solicitar crear informacion sobre las imagenes
 * -- crear un objeto con toda la informacion necesaria
 * -- guarda el objeto en la coleccion de campeones
 * @returns
 */
const setAllChamps = async () => {
	await Champ.deleteMany({})
	const [championBase_, champIds] = await _askForGeneralChampsInfo()

	for (let i = 0; i < champIds.length; i++) {
		const currentIdInFor = champIds[i]
		const currentChampInFor = championBase_[currentIdInFor]

		try {
			const currentChampDetail = await _askForSpecificChampInfo(currentIdInFor)

			const images = createChampImagesUrls(currentChampDetail)

			const setChampToSave = new Champ({
				...currentChampInFor,
				...currentChampDetail,
				images,
			})

			await setChampToSave.save()

			console.log(
				`saved ${i + 1} champions of ${champIds.length} in loop ${i + 1}`
			)

			// ----------------------------------------------------------------------------------
		} catch (e) {
			console.warn('Catch Error champions.controller -> setAllChamps', {
				name: e.name,
				// custom_name: '',
				custom_message: `an error ocrred while trying to set ${currentIdInFor} champion in Champ collection`,
				message: e.message,
				error: e,
			})
		}
	}
}

// ROUTE: /champions GET
exports.allChamps = async (req, res) => {
	const champs = await Champ.find({})
	return res.json(champs)
}

// ROUTE: /champions/set GET
exports.setChamps = async (req, res) => {
	const champs = await setAllChamps()
	return res.status(201).json(champs)
}
