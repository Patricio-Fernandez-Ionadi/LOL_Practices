import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { SearchingSummonerContext } from "../context/SummonerSearchContext"

const SearchBar = () => {
	const [searchInput, setSearchInput] = useState("")
	const summ = useContext(SearchingSummonerContext)
	let history = useHistory()

	// ----.............
	const handleSubmitSearchSummoner = (e) => {
		e.preventDefault()
		summ.setSearchSummoner(searchInput)
		setSearchInput("")
	}

	useEffect(() => {
		if (summ.summoner) history.push(`/summoner/${summ.summoner}`)
	}, [summ, history])

	return (
		<form onSubmit={handleSubmitSearchSummoner}>
			<input
				type='text'
				value={searchInput}
				onChange={(e) => setSearchInput(e.target.value)}
				placeholder='Search summoner'
			/>
		</form>
	)
}

export default SearchBar
