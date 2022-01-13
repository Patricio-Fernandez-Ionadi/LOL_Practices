import React from 'react'
import { useParams } from 'react-router-dom'

import { ChampionContent } from '../../components/Champion/ChampionContent'
import { ChampionHabilities } from '../../components/Champion/ChampionHabilities'
import { ChampionHero } from '../../components/Champion/ChampionHero'
import { ChampionSkins } from '../../components/Champion/ChampionSkins'
import { useChampionsContext } from '../../context/Champions/ChampionsContext'

export const Champion = () => {
	const { champion } = useParams()

	const { champions, isLoading } = useChampionsContext()

	if (!isLoading) {
		const [champ] = champions.filter((champ) => champ.id === champion)
		console.log(champ)
	}

	return (
		<div>
			<h1>Champion</h1>
			<ChampionHero />
			<ChampionContent />
			<ChampionHabilities />
			<ChampionSkins />
		</div>
	)
}
