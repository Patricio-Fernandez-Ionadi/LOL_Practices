import React from 'react'

import { useAllChamps } from '../../services/useAllChamps'

import { ChampionCardsContainer } from '../../components/Champion/ChampionCardsContainer'

export const Home = () => {
	const [champions, loadingChamps] = useAllChamps()

	return (
		<main>
			<ChampionCardsContainer champions={champions} isLoading={loadingChamps} />
		</main>
	)
}
