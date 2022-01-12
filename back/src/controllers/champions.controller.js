const Champ = require('../models/championsModel')
const {
	getAllChamps,
	getChamp,
	getChampImages,
} = require('../services/championServices')

exports.allChamps = async (req, res) => {
	const champions = await getAllChamps()
	res.json(champions)
}

exports.champion = async (req, res) => {
	const { championName } = req.params

	const [mongoChamp] = await Champ.find({ name: championName })

	if (mongoChamp.images.splash[0]) {
		console.log('tiene imagenes, retornado desde mongo')
		return res.json(mongoChamp)
	} else {
		console.log('no tiene images, lo actualizamos desde la api')
		const championRequest = await getChamp(championName)

		const champ = championRequest.data[championName]
		const skines = championRequest.data[championName].skins
		const spells = championRequest.data[championName].spells
		const passiveD = championRequest.data[championName].passive.image.full

		const { loading, spell, splash, avatar, passive } = await getChampImages(
			championName,
			skines,
			spells,
			passiveD
		)

		const newInfoForChamp = {
			...champ,
			images: {
				loading: [...loading],
				spell: [...spell],
				splash: [...splash],
				avatar,
				passive,
			},
		}

		const updatedChamp = await Champ.findOneAndUpdate(
			{ _id: mongoChamp._id },
			newInfoForChamp,
			{
				new: true,
			}
		)
		return res.json(updatedChamp)
	}
}
