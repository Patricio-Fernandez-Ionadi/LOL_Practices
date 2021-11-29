import { useContext } from "react"
import { Link } from "react-router-dom"
import { AllChampionsContext } from "../../services/getAllChampions"

const Champions = () => {
	const champsContext = useContext(AllChampionsContext)
	// this returns [[],{}]

	if (champsContext) {
		let champs = champsContext[0]
		return (
			<div>
				{champs.map((each) => {
					const { key, name, id } = each
					// console.log(each)
					return (
						<Link
							to={{
								pathname: `/champions/${id}`,
								state: id,
							}}
							key={key}
						>
							<img
								src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${each.image.full}`}
								alt='champ splash loading'
							/>
							<span>{name}</span>
						</Link>
					)
				})}
			</div>
		)
	} else {
		return (
			<div>
				<p>LOADING...</p>
			</div>
		)
	}
}

export default Champions
