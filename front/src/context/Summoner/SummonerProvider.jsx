import { useReducer } from 'react'

// import Context file
import { SummonerContext } from './SummonerContext'
// import reducer file
import { summonerReducer } from './summonerReducer'

const INITIAL_STATE = {
	summoners: [],
	perifericalSummoner: [],
}

export const SummonerProvider = ({ children }) => {
	const [state, dispatch] = useReducer(summonerReducer, INITIAL_STATE)

	// write your code here...

	const addSummonerSearched = (user) => {
		dispatch({ type: 'addSummoner', payload: user })
	}

	return (
		<SummonerContext.Provider
			value={{
				addSummonerSearched,
				state,
			}}
		>
			{children}
		</SummonerContext.Provider>
	)
}
