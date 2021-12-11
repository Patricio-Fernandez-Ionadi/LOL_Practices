import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import { env } from "../../environment"

const Champions = () => {
	const [allChamps, setAllChamps] = useState(null)

	useEffect(() => {
		fetch(`${env.SV_HOST}/champions`)
			.then((res) => res.json())
			.then((res) => {
				setAllChamps(res)
			})
	}, [])

	if (allChamps) {
		return (
			<>
				<div>champions</div>
				{allChamps.map((each) => (
					<div key={each.key}>
						<p>
							{each.name}
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/champion/${each.id}.png`}
								alt=''
							/>
						</p>
						<p>{each.title}</p>
					</div>
				))}
			</>
		)
	} else {
		return <Loading />
	}
}

export default Champions
