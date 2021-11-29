import { useContext } from "react"
import { AllChampionsContext } from "../../services/getAllChampions"
import Loading from "../../components/Loading"
import ChampionsPortrait from "./ChampionsPortrait"

const componentContainer = {
	display: "flex",
	flexWrap: "wrap",
	width: "100%",
}

const Champions = () => {
	const champsContext = useContext(AllChampionsContext)

	if (champsContext) {
		let champs = champsContext[0]
		return (
			<div style={componentContainer}>
				{champs.map((each) => {
					const { key, name, id } = each
					return <ChampionsPortrait key={key} name={name} id={id} each={each} />
				})}
			</div>
		)
	} else {
		return <Loading />
	}
}

export default Champions
