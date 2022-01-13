import { useEffect, useState } from 'react'
import axios from 'axios'

export const useAllChamps = () => {
	const [champions, setChampions] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)
		axios.get(`http://localhost:3001/champions`).then((res) => {
			setChampions(res.data)
			setIsLoading(false)
		})
	}, [])
	return [champions, isLoading]
}
