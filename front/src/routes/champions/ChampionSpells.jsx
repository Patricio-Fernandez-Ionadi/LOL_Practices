import React from "react"

const ChampionSpells = ({ champ, spells }) => {
	return (
		<>
			<h2>Skills</h2>
			<div>
				<h4>Passive - {champ.passive.name}</h4>
				<img
					src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/passive/${champ.passive.image.full}`}
					alt='pasive-icon'
				/>
				<p>{champ.passive.description}</p>

				<h4>Q - {spells[0].name}</h4>
				<p>{spells[0].cooldownBurn}</p>
				<img
					src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/${spells[0].image.full}`}
					alt='q-icon'
				/>
				<p>{spells[0].description}</p>

				<h4>W - {spells[1].name}</h4>
				<p>{spells[1].cooldownBurn}</p>
				<img
					src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/${spells[1].image.full}`}
					alt='w-icon'
				/>
				<p>{spells[1].description}</p>

				<h4>E - {spells[2].name}</h4>
				<p>{spells[2].cooldownBurn}</p>
				<img
					src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/${spells[2].image.full}`}
					alt='e-icon'
				/>
				<p>{spells[2].description}</p>

				<h4>R - {spells[3].name}</h4>
				<p>{spells[3].cooldownBurn}</p>
				<img
					src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/spell/${spells[3].image.full}`}
					alt='r-icon'
				/>
				<p>{spells[3].description}</p>
				{/* ---------------------------------------------------------------------------- */}
				<h2>Tips for enemys</h2>
				<p>{champ.enemytips[0]}</p>
				<p>{champ.enemytips[1]}</p>
			</div>
		</>
	)
}

export default ChampionSpells
