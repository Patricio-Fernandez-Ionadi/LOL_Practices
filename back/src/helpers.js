exports.headerRequest = {
	headers: { "X-Riot-Token": process.env.API_KEY },
}

exports.helpersForServices = {
	createTeam: (players) => {
		let blueTeam = {
			participants: [],
			teamId: 100,
			kills: 0,
			assists: 0,
			deaths: 0,
			win: false,
		}
		let redTeam = {
			participants: [],
			teamId: 200,
			kills: 0,
			assists: 0,
			deaths: 0,
			win: false,
		}
		players.map((player) => {
			const { teamId, kills, assists, deaths, win } = player
			if (teamId === 100) {
				blueTeam.participants.push(player)
				blueTeam.kills += kills
				blueTeam.assists += assists
				blueTeam.deaths += deaths
				blueTeam.win = win
			} else if (teamId === 200) {
				redTeam.participants.push(player)
				redTeam.kills += kills
				redTeam.assists += assists
				redTeam.deaths += deaths
				redTeam.win = win
			} else {
				console.log(player.teamId)
			}
		})
		return { redTeam, blueTeam }
	},
}
