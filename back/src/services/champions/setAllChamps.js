const axios = require('axios')

const { headerRequest } = require('../../helpers')
const Champ = require('../../models/championsModel')

const { getChampImages } = require('./getImages')

let version = '11.23.1'
let language = 'es_AR'

const _askForGeneralChampsInfo = async () => {
	const { data: firstApiCall } = await axios
		.get(
			`http://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`,
			headerRequest
		)
		.catch((e) => {
			const Error = {
				custom: 'an error ocrred while trying to get champion.json from Api',
				status: e.status,
				// message: e.message,
				// error: e,
			}
			return Error
		})

	const championsInfoG = firstApiCall.data
	// console.log(generalChampionsInfoG) // {"champ": {...},"champ": {...}, ...}
	const champsIds = Array.from(Object.keys(championsInfoG))

	return [championsInfoG, champsIds]
}

const _askForSpecificChampInfo = async (champId) => {
	const response = await axios
		.get(
			`http://ddragon.leagueoflegends.com/cdn/11.23.1/data/${language}/champion/${champId}.json`,
			headerRequest
		)
		.catch((e) => {
			const Error = {
				custom: `an error ocurred making api request for a specific champ: ${champId}`,
				status: e.status,
				// message: e.message,
				// error: e,
			}
			return Error
		})

	return response.data.data[champId]
}

const setAllChamps = async () => {
	// ----------------------------------------------------------------------------------
	// -la base de datos esta vacia
	await Champ.deleteMany({})
	// ----------------------------------------------------------------------------------

	// ----------------------------------------------------------------------------------
	// obtenemos todos los campeones de la Api (informacion general)

	const [championBase_, champIds] = await _askForGeneralChampsInfo()

	// return [champIds, championBase_]

	// ----------------------------------------------------------------------------------

	// ----------------------------------------------------------------------------------
	// // debemos obtener alguna forma de operar con cada uno

	for (let i = 0; i < champIds.length; i++) {
		const currentIdInFor = champIds[i]
		const currentChampInFor = championBase_[currentIdInFor]

		try {
			// // // de cada uno debemos buscar la informacion completa
			const currentChampDetail = await _askForSpecificChampInfo(currentIdInFor)

			// // // de cada informacion completa la usaremos para obtener informacion de la cantidad de skins, los spells y la pasiva para poder obtener informacion de la url de las imagenes de todas estas y tambien de la pantalla de carga

			const currentChampSkins = currentChampDetail.skins
			// -> [{id, num , name , chromas},...]

			const currentChampSpells = currentChampDetail.spells
			//  -> [{id, name, description, tooltip,leveltip: [Object],maxrank,cooldown: [],cooldownBurn,cost: [],costBurn,datavalues: {},effect: [],effectBurn: [],vars: [],costType,maxammo,range: [],rangeBurn,image: [Object],resource},...]

			const currentChampPassiveImagePath = currentChampDetail.passive.image.full
			//  --> passive : {name, description, image: {full, sprite, group, x, y, w, h}}

			const images = await getChampImages(
				currentIdInFor,
				currentChampSkins,
				currentChampSpells,
				currentChampPassiveImagePath
			)

			// // // con esa informacion deberemos crear un champ con
			// // //  - la informacion de la api
			// // //  - la informacion detallada
			// // //  - una property images donde meteremos las url obtenidas en el paso anterior

			const setChampToSave = new Champ({
				...currentChampInFor,
				...currentChampDetail,
				images,
			})

			// // // // guardar el objeto en la base de datos
			await setChampToSave.save()

			const champsStoredInDb = await Champ.find({})

			console.log(
				`saved ${champsStoredInDb.length} champions of ${champIds.length} in loop ${i}`
			)

			// if

			// ----------------------------------------------------------------------------------
		} catch (e) {
			console.log(e, 'error')
			const Error = {
				custom: `an error ocrred in for loop trying to get ${currentIdInFor}`,
				status: e.status,
				// message: e.message,
				// error: e,
			}
			return Error
		}
	}

	return { status: 102 }
}

module.exports = { setAllChamps }
