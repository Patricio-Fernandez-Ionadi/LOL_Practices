import { useParams } from 'react-router-dom'
import useSummoner from '../../services/useSummoner'

const SummonerStats = () => {
	let { summonerName } = useParams()
	const summoner = useSummoner(encodeURI(summonerName))

	// console.log(summoner)

	// console.log('summ stats')

	if (summoner) {
		return (
			<div>
				<p>APP</p>

				<div>
					<p>Nombre de invocador: {summoner.summonerName}</p>
					<img src={`${summoner.iconUrl}`} alt='summoner-icon' />
					<p>
						Liga: {summoner.tier} {summoner.rank} {summoner.leaguePoints}LP
					</p>
					<p>Win Ratio: {summoner.winRate}%</p>
				</div>
				<p>
					wins: {summoner.wins} - Losses: {summoner.losses}
				</p>
				<ul>
					{summoner.lastMatches?.map((each) => (
						<li key={each}>{each}</li>
					))}
				</ul>
			</div>
		)
	} else {
		return (
			<>
				<p>SEARCHING SUMMONER...</p>
			</>
		)
	}
}

export default SummonerStats
