import React from 'react'
import { useChampionsContext } from '../../context/Champions/ChampionsContext'
import { ChampionCard } from './ChampionCard'
import styles from './styles.module.css'

export const ChampionCardsContainer = () => {
	const { champions, isLoading } = useChampionsContext()

	return (
		<div className={styles.container}>
			{isLoading ? (
				<h1 style={{ color: '#fff' }}>Loading Bitch!</h1>
			) : (
				champions.map((each) => <ChampionCard {...each} key={each.id} />)
			)}
		</div>
	)
}
