import useChampion from "../../services/useChampion"
import ChampionBanner from "./ChampionBanner"
import ChampionLore from "./ChampionLore"
import ChampionSkins from "./ChampionSkins"
import ChampionSpells from "./ChampionSpells"

const Champion = ({ match }) => {
	const { champion } = match.params
	const champ = useChampion(champion)

	if (champ) {
		let { id, name, title, lore, blurb, skins, spells } = champ
		return (
			<>
				<ChampionBanner id={id} name={name} title={title} />
				<ChampionLore blurb={blurb} lore={lore} />
				<ChampionSkins id={id} skins={skins} />
				<ChampionSpells spells={spells} champ={champ} />
			</>
		)
	} else {
		return (
			<>
				<p>SEARCHING...</p>
			</>
		)
	}
}

export default Champion
