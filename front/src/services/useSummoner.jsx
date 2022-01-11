import { useEffect, useState } from 'react'
import { env } from '../environment'

const useSummoner = (summonerName) => {
	const [state, setState] = useState()

	console.log(summonerName)

	useEffect(() => {
		return fetch(`${env.SV_HOST}/summoner/${summonerName}`)
			.then((res) => res.json())
			.then((res) => {
				if (res) {
					setState(res)
					// return
				}
			})
	}, [summonerName])

	if (summonerName && summonerName !== '') {
		console.log(state)
		return state
	} else {
		return false
	}
}

export default useSummoner

// {
// accountId: "gtss-sPB5aSrLIMMoTpKc35idiK1P4x1FOLzRjH3emI"
// iconUrl: "https://ddragon.leagueoflegends.com/cdn/11.23.1/img/profileicon/546.png"
// id: "mGIPiK2a0LU5cMT4UmaTEHmeFZMtYnY6THRKxJZ0-kks"
// lastMatches: (20) ['LA2_1109922581', 'LA2_1109889487', 'LA2_1109699960', 'LA2_1109726861', 'LA2_1109556326', 'LA2_1109534076', 'LA2_1109561325', 'LA2_1109429102', 'LA2_1109388928', 'LA2_1109394789', 'LA2_1109324294', 'LA2_1109331771', 'LA2_1109340085', 'LA2_1109130785', 'LA2_1108923308', 'LA2_1108911931', 'LA2_1108930369', 'LA2_1108879234', 'LA2_1108897528', 'LA2_1108885508']
// leagueId: "11d96621-8143-4f66-893d-c8254492b92e"
// leaguePoints: 72
// losses: 19
// puuid: "SLgRzAMAEBnm7X9HhHYckJEXbsEcNZzzMw9ue0RBXazONR7wI2qifTV5pPmPbSye0kx8JdEbXH-A3g"
// queueType: "RANKED_FLEX_SR"
// rank: "II"
// summonerId: "mGIPiK2a0LU5cMT4UmaTEHmeFZMtYnY6THRKxJZ0-kks"
// summonerLevel: 276
// summonerName: "Éster Piscore"
// tier: "SILVER"
// winRate: "51.3"
// wins: 20
// }
