import { createContext, useEffect, useState } from "react"
import { env } from "../environment"

export const AllChampionsContext = createContext()

const AllChampionsProvider = ({ children }) => {
	const [allChamps, setAllChamps] = useState(null)

	useEffect(() => {
		fetch(`${env.SV_HOST}/champions`)
			.then((res) => res.json())
			.then((res) => {
				const champsList = []
				for (let champ in res) {
					champsList.push(res[champ])
				}
				setAllChamps([champsList, res])
			})
	}, [])

	return (
		<AllChampionsContext.Provider value={allChamps}>
			{children}
		</AllChampionsContext.Provider>
	)
}

export default AllChampionsProvider
