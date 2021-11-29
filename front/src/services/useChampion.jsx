import { useEffect, useState } from "react"
import { env } from "../environment"

const useChampion = (queryParam) => {
	const [champ, setChamp] = useState(null)
	useEffect(() => {
		fetch(`${env.SV_HOST}/champions/${queryParam}`)
			.then((res) => res.json())
			.then((res) => {
				let champData = res.data[queryParam]
				setChamp(champData)
			})
	}, [queryParam])
	return champ
}

export default useChampion
