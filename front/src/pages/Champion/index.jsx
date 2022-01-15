import React from 'react'

import { useParams } from 'react-router-dom'

import { useChampionsContext } from '../../context/Champions/ChampionsContext'

import { ChampionHabilities } from '../../components/Champion/ChampionHabilities'
import { ChampionHero } from '../../components/Champion/ChampionHero'
import { ChampionSkins } from '../../components/Champion/ChampionSkins'

export const Champion = () => {
	const { champion } = useParams()

	const { champions, isLoading } = useChampionsContext()

	if (!isLoading) {
		const [champ] = champions.filter((champ) => champ.id === champion)
		console.log(champ)

		return (
			<div>
				<ChampionHero {...champ} />
				<ChampionHabilities />
				<ChampionSkins />
			</div>
		)
	} else {
		return (
			<>
				<h1>LOADING...</h1>
			</>
		)
	}
}
