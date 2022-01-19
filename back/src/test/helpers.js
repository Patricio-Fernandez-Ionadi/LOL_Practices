const supertest = require('supertest')
const { app } = require('../index')
const api = supertest(app)

const initialSummoners = [
	{
		_id: '61e80fdfc028c5949a1c2aca',
		id: 'mGIPiK2a0LU5cMT4UmaTEHmeFZMtYnY6THRKxJZ0-kks',
		accountId: 'gtss-sPB5aSrLIMMoTpKc35idiK1P4x1FOLzRjH3emI',
		puuid:
			'SLgRzAMAEBnm7X9HhHYckJEXbsEcNZzzMw9ue0RBXazONR7wI2qifTV5pPmPbSye0kx8JdEbXH-A3g',
		summonerName: 'Éster Piscore',
		name: 'Éster Piscore',
		profileIconUrl:
			'http://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/546.png',
		profileIconId: 546,
		revisionDate: 1642347055000,
		summonerLevel: 290,
		__v: 0,
	},
	{
		_id: '61e813eb092d7a62926c8598',
		id: 'Tvi7rnfjx1oaNQzkTQoj43VDzxvy7qyVO6Kgy8sgq4W9',
		accountId: 'Rp7t6MkS6Voo_ULtLEp_XQPXLbgDfrGHd1Y0CjgKO3c',
		puuid:
			'Q8lU6PJ3rwq0QVmYAwzZA99iwL3OBxqNaZs3klQr71OmHdTkJ1tGx9SfKoem-K8pdEFbt0xo_mziuQ',
		summonerName: 'Booh the Ghost',
		name: 'Booh the Ghost',
		profileIconUrl:
			'http://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/7.png',
		profileIconId: 7,
		revisionDate: 1642570333014,
		summonerLevel: 88,
		__v: 0,
	},
	{
		stats: {
			leagueId: '6fe4cc2e-fe12-4100-ac50-3789d7798b3b',
			queueType: 'RANKED_SOLO_5x5',
			tier: 'GOLD',
			rank: 'I',
			leaguePoints: 46,
			wins: 14,
			losses: 7,
			veteran: false,
			inactive: false,
			freshBlood: false,
			hotStreak: false,
		},
		_id: '61e8140d092d7a62926c859c',
		id: 'HwfZM6k3cPI0CcTrVLVrTnA3BOAm4LwRpkhG2jiAu1lozQ',
		accountId: 'Os1_kU8N-a55L7JdCRKFxhbgpBm9D55bbNt1IXPYsV2sKtY',
		puuid:
			'9tPeuuORAMSqZMZtTLdFEt9O2N7KAUtuGi6LwvkbNy0Tosi0tWEQeir_MKKg8oRxCfvpjorfECWAKA',
		summonerName: 'Hasaj',
		name: 'Hasaj',
		profileIconUrl:
			'http://ddragon.leagueoflegends.com/cdn/12.1.1/img/profileicon/4073.png',
		profileIconId: 4073,
		revisionDate: 1642457256000,
		summonerLevel: 428,
		__v: 0,
	},
]

module.exports = { initialSummoners, api }
