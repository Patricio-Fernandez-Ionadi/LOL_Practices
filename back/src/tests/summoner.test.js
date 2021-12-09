const { server } = require("../index")
const api = require("./helpers")

describe("Summoner", () => {
	test("should get id whit a summoner name", async () => {
		// const res = await getSummonerIDsByName("Agnael")
		// console.log(res)
		/* NOT WORKING */
	})
})

afterAll(() => {
	server.close()
})
