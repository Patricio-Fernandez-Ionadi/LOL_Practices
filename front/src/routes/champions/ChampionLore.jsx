import { useState } from "react"
import { makeStyles } from "@material-ui/core"
import { color } from "../../environment"

const useStyles = makeStyles({
	title: {
		color: color.brown.light,
	},
	text: {
		color: color.base.teal.light,
	},
	loreContainer: {
		backgroundColor: color.base.teal.dark,
	},
})
const ChampionLore = ({ blurb, lore }) => {
	const [readMore, setReadMore] = useState(false)
	const classes = useStyles()
	const { title, text, loreContainer } = classes

	return (
		<div className={loreContainer}>
			<h2 className={title}>Lore</h2>
			{readMore ? (
				<p className={text}>
					{lore}{" "}
					<span>
						<button onClick={(e) => setReadMore(!readMore)}>contract</button>
					</span>
				</p>
			) : (
				<p className={text}>
					{blurb}{" "}
					<span>
						<button onClick={(e) => setReadMore(!readMore)}>expand</button>
					</span>
				</p>
			)}
		</div>
	)
}

export default ChampionLore
