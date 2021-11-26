import { createContext, useState } from "react"

export const SearchingSummonerContext = createContext()

const SummonerSearch = ({ children }) => {
	const [searchSummoner, setSearchSummoner] = useState(null)

	const summonerSearching = {
		summoner: searchSummoner,
		setSearchSummoner,
	}

	return (
		<SearchingSummonerContext.Provider value={summonerSearching}>
			{children}
		</SearchingSummonerContext.Provider>
	)
}

export default SummonerSearch
