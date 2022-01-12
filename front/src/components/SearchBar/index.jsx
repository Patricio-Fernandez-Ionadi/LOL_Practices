import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {
	const [searchInput, setSearchInput] = useState('')
	let history = useHistory()

	const handleSubmitSearchSummoner = (e) => {
		e.preventDefault()
		history.push(`/summoner/${searchInput}`)
		setSearchInput('')
	}

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
