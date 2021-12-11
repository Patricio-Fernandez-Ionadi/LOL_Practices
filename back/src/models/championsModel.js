const mongoose = require("mongoose")
const { model, Schema } = mongoose

const champsSchema = new Schema({
	version: String,
	id: String,
	key: String,
	name: String,
	title: String,
	blurb: String,
	info: {
		attack: Number,
		defense: Number,
		magic: Number,
		difficulty: Number,
	},
	image: {
		full: String,
		sprite: String,
		group: String,
		x: Number,
		y: Number,
		w: Number,
		h: Number,
	},
	tags: [String],
	partype: String,
	stats: {
		hp: Number,
		hpperlevel: Number,
		mp: Number,
		mpperlevel: Number,
		movespeed: Number,
		armor: Number,
		armorperlevel: Number,
		spellblock: Number,
		spellblockperlevel: Number,
		attackrange: Number,
		hpregen: Number,
		hpregenperlevel: Number,
		mpregen: Number,
		mpregenperlevel: Number,
		crit: Number,
		critperlevel: Number,
		attackdamage: Number,
		attackdamageperlevel: Number,
		attackspeedperlevel: Number,
		attackspeed: Number,
	},
})

champsSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		// returnedObject.id = returnedObject._id
		// delete returnedObject._id
		// delete returnedObject.__v
	},
})

const Champs = model("champions", champsSchema)

module.exports = Champs
