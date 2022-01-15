import React from 'react'

import { useAllChamps } from '../../services/useAllChamps'

import { ChampionCardsContainer } from '../../components/Champion/ChampionCardsContainer'

export const Home = () => {
	const [champions, loadingChamps] = useAllChamps()

	return (
		<>
			<h1>HOME</h1>
			<ChampionCardsContainer champions={champions} isLoading={loadingChamps} />
		</>
	)
}
