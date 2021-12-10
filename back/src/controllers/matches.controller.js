const { getMatch } = require("../services/matchServices")
const { getSummoner } = require("../services/summonerServices")

exports.matchInfo = async (req, res) => {
	const { matchId } = req.params //LA2_1116684394

	try {
		const { data } = await getMatch.info(matchId)
		const teams = await getMatch.teams(matchId)
		return res.json({
			participantsPuuids: data.metadata.participants,
			teams,
		})
	} catch (e) {
		res.json(e)
	}
}

exports.currentMatch = async (req, res) => {
	const { summonerName } = req.params
	const { id } = await getSummoner.byName(summonerName)
	const current = await getMatch.current(id)

	return res.json(current)
}

/* 
{
  "gameId": 1117249808,
  "mapId": 11,
  "gameMode": "CLASSIC",
  "gameType": "MATCHED_GAME",
  "gameQueueConfigId": 440,
  "participants": [
    {
      "teamId": 100,
      "spell1Id": 14,
      "spell2Id": 4,
      "championId": 16,
      "profileIconId": 3864,
      "summonerName": "Durnehvirr",
      "bot": false,
      "summonerId": "JkxT7ei_tej2_njV0QEoSAFd29fmj9PnisdVfUrj3FLBUUo",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          8214,
          8226,
          8210,
          8237,
          8453,
          8444,
          5005,
          5008,
          5002
        ],
        "perkStyle": 8200,
        "perkSubStyle": 8400
      }
    },
    {
      "teamId": 100,
      "spell1Id": 14,
      "spell2Id": 4,
      "championId": 238,
      "profileIconId": 4410,
      "summonerName": "JOE BlDEN",
      "bot": false,
      "summonerId": "8ad5OLsDaT6bDrYjogIxwBHynEuWMqwSavWQy-YhfxgEIQ",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          8112,
          8143,
          8138,
          8135,
          8009,
          8014,
          5008,
          5008,
          5002
        ],
        "perkStyle": 8100,
        "perkSubStyle": 8000
      }
    },
    {
      "teamId": 100,
      "spell1Id": 4,
      "spell2Id": 7,
      "championId": 81,
      "profileIconId": 4149,
      "summonerName": "Zucker Mambreta",
      "bot": false,
      "summonerId": "iGikCTD9V6-vpZglJ1D6vwTfbD1NiQQtvxiDspNjGTu6",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          8369,
          8304,
          8345,
          8347,
          8009,
          9103,
          5005,
          5008,
          5002
        ],
        "perkStyle": 8300,
        "perkSubStyle": 8000
      }
    },
    {
      "teamId": 100,
      "spell1Id": 4,
      "spell2Id": 12,
      "championId": 127,
      "profileIconId": 5053,
      "summonerName": "Azedor",
      "bot": false,
      "summonerId": "QcsQKPQ10ZLFHkXMMqD5QUm7tcV79llxf-DRQXuJHqI",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          8439,
          8446,
          8473,
          8242,
          8226,
          8237,
          5005,
          5008,
          5001
        ],
        "perkStyle": 8400,
        "perkSubStyle": 8200
      }
    },
    {
      "teamId": 100,
      "spell1Id": 4,
      "spell2Id": 11,
      "championId": 33,
      "profileIconId": 503,
      "summonerName": "Winchón",
      "bot": false,
      "summonerId": "K1GsvU1XTPZiURsa6ijFzXTc71bx-Oja6Lx9FhqIjxsI",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          8439,
          8446,
          8473,
          8242,
          9111,
          9104,
          5005,
          5002,
          5001
        ],
        "perkStyle": 8400,
        "perkSubStyle": 8000
      }
    },
    {
      "teamId": 200,
      "spell1Id": 14,
      "spell2Id": 4,
      "championId": 7,
      "profileIconId": 4658,
      "summonerName": "Hewrek",
      "bot": false,
      "summonerId": "Gf51tQo1EZGmxh-70PTFzwP1aqGnBg6PuLUCiLKKXSDcKS4",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          8112,
          8139,
          8138,
          8135,
          8345,
          8352,
          5005,
          5008,
          5003
        ],
        "perkStyle": 8100,
        "perkSubStyle": 8300
      }
    },
    {
      "teamId": 200,
      "spell1Id": 3,
      "spell2Id": 4,
      "championId": 119,
      "profileIconId": 4661,
      "summonerName": "LdScraaK",
      "bot": false,
      "summonerId": "tyYHJVB4_r9gfiC3dYic9sHVc--TyqdompgSqatbyb2CHg",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          9923,
          8139,
          8138,
          8135,
          8009,
          9103,
          5005,
          5008,
          5003
        ],
        "perkStyle": 8100,
        "perkSubStyle": 8000
      }
    },
    {
      "teamId": 200,
      "spell1Id": 12,
      "spell2Id": 4,
      "championId": 84,
      "profileIconId": 4982,
      "summonerName": "G2 S E B A S 365",
      "bot": false,
      "summonerId": "xvu3_ca5QnUtGkJipNXxmHTjMAXx9hyeOQhFD9hC7X_--6U",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          8010,
          8009,
          9105,
          8014,
          8473,
          8451,
          5008,
          5008,
          5002
        ],
        "perkStyle": 8000,
        "perkSubStyle": 8400
      }
    },
    {
      "teamId": 200,
      "spell1Id": 4,
      "spell2Id": 14,
      "championId": 111,
      "profileIconId": 4403,
      "summonerName": "Rey del arroz",
      "bot": false,
      "summonerId": "tnc-9MFP71Z7E-vgDIVhKxV1rwYx3m8S_wQ8FidKECqA",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          8351,
          8313,
          8345,
          8347,
          8401,
          8473,
          5007,
          5002,
          5002
        ],
        "perkStyle": 8300,
        "perkSubStyle": 8400
      }
    },
    {
      "teamId": 200,
      "spell1Id": 11,
      "spell2Id": 4,
      "championId": 31,
      "profileIconId": 5141,
      "summonerName": "AlabadoSea Gauss",
      "bot": false,
      "summonerId": "lr9iRm7Q5KZ8MaE208QIZ3pP8o11mjexkwpLESWnotpEKA",
      "gameCustomizationObjects": [],
      "perks": {
        "perkIds": [
          8124,
          8126,
          8138,
          8135,
          9111,
          9104,
          5005,
          5008,
          5002
        ],
        "perkStyle": 8100,
        "perkSubStyle": 8000
      }
    }
  ],
  "observers": {
    "encryptionKey": "Kz3PZSEgrQJDibCedme5T3npXNM8tyqq"
  },
  "platformId": "LA2",
  "bannedChampions": [
    {
      "championId": 777,
      "teamId": 100,
      "pickTurn": 1
    },
    {
      "championId": 51,
      "teamId": 100,
      "pickTurn": 2
    },
    {
      "championId": 23,
      "teamId": 100,
      "pickTurn": 3
    },
    {
      "championId": 141,
      "teamId": 100,
      "pickTurn": 4
    },
    {
      "championId": 105,
      "teamId": 100,
      "pickTurn": 5
    },
    {
      "championId": 89,
      "teamId": 200,
      "pickTurn": 6
    },
    {
      "championId": 147,
      "teamId": 200,
      "pickTurn": 7
    },
    {
      "championId": 875,
      "teamId": 200,
      "pickTurn": 8
    },
    {
      "championId": 105,
      "teamId": 200,
      "pickTurn": 9
    },
    {
      "championId": 234,
      "teamId": 200,
      "pickTurn": 10
    }
  ],
  "gameStartTime": 1639170423056,
  "gameLength": 1295
}
*/
