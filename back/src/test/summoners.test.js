const mongoose = require('mongoose')
const { server } = require('../index')
const Summoner = require('../models/summonerModel')
const { initialSummoners, api } = require('./helpers')

beforeEach(async () => {
	await Summoner.deleteMany({})

	const summonersObjects = initialSummoners.map(
		(summoner) => new Summoner(summoner)
	)
	const promises = summonersObjects.map((summoner) => summoner.save())
	await Promise.all(promises)
})

test('there ara a test', () => {
	console.log('TTTEEEESSSTTT')
	expect(true).toBe(true)
})

afterAll(() => {
	mongoose.connection.close()
	server.close()
})
