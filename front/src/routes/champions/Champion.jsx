import Loading from "../../components/Loading"
import useChampion from "../../services/useChampion"

const Champion = ({ match }) => {
	const { champion } = match.params
	const champ = useChampion(champion)

	if (champ) {
		return (
			<>
				<div>especific champ</div>
			</>
		)
	} else {
		return <Loading />
	}
}

export default Champion
