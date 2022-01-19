import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {
	const [inputValue, setInputValue] = useState('')
	let history = useHistory()

	const handleSubmit = (e) => {
		e.preventDefault()
		history.push(`/summoner/${inputValue}`)
		setInputValue('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Buscar un invocador...'
				value={inputValue}
				onChange={({ target }) => setInputValue(target.value)}
			/>
		</form>
	)
}

export default SearchBar
