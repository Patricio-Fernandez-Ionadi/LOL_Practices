const axios = require('axios')
const { headerRequest } = require('../../config/helpers')

// create match teams from a past match id
const matchTeams = async (matchId) => {
	const { data: info } = await axios.get(
		`${process.env.LOL_REGION}/lol/match/v5/matches/${matchId}`,
		headerRequest
	)

	const { participants } = info.info

	const blueTeamParticipants = participants.filter(
		(each) => each.teamId === 100
	)
	const redTeamParticipants = participants.filter((each) => each.teamId === 200)

	const blueTeam = {
		participants: blueTeamParticipants,
		win: blueTeamParticipants[0].win,
	}

	const redTeam = {
		participants: redTeamParticipants,
		win: redTeamParticipants[0].win,
	}
	return { blueTeam, redTeam, info }
}

const matchTimeLine = async (matchId) => {
	const { data } = await axios.get(
		`${process.env.LOL_REGION}/lol/match/v5/matches/${matchId}/timeline`,
		headerRequest
	)

	return data
}

// get a specific past match
const getSummonerMatch = async (matchId) => {
	const timeLine = await matchTimeLine(matchId)
	const { blueTeam, redTeam, info } = await matchTeams(matchId)
	const teams = { blueTeam, redTeam }

	return { teams, timeLine, info }
}

// ---------------------------------------------------------------------

const getCurrentMatch = async (summId) => {
	console.log('getCurrentMatch called')
	const { data } = await axios
		.get(
			`${process.env.LAS_URI}/lol/spectator/v4/active-games/by-summoner/${summId}`,
			headerRequest
		)
		.catch((e) => {
			return {
				currentBysummonerId: {
					status: e.response.status,
					message: e.response.message,
					error: e,
				},
			}
		})
	return data
}

module.exports = { getCurrentMatch, getSummonerMatch }
