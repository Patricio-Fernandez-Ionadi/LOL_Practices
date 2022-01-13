import React, { useReducer, useEffect } from 'react'
import { useAllChamps } from '../../services/useAllChamps'

// import Context file
import { ChampionsContext } from './ChampionsContext'

// import reducer file
import { championsReducer } from './championsReducer'

const INITIAL_STATE = []

export const ChampionsContextProvider = ({ children }) => {
	const [champions, dispatch] = useReducer(championsReducer, INITIAL_STATE)

	const [champs, isLoading] = useAllChamps()

	useEffect(() => {
		if (champs[0]) {
			dispatch({ type: 'setAllChamps', payload: champs })
		}
	}, [champs])

	return (
		<ChampionsContext.Provider
			value={{
				champions,
				isLoading,
			}}
		>
			{children}
		</ChampionsContext.Provider>
	)
}
