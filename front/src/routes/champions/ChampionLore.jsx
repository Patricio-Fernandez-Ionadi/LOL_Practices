import { useState } from "react"
import { makeStyles } from "@material-ui/core"
import { color } from "../../environment"
import ContainerInt from "../../components/Layout/Container"

const useStyles = makeStyles({
	title: {
		color: color.brown.light,
	},
	text: {
		color: color.base.teal.light,
	},
	readToggle: {
		background: "none",
		border: "none",
		outline: "none",
		color: color.base.teal.light,
		marginLeft: "10px",
		"&:hover": {
			color: color.base.teal.regular,
		},
	},
})
const ChampionLore = ({ blurb, lore }) => {
	const [readMore, setReadMore] = useState(false)
	const classes = useStyles()
	const { title, text, readToggle } = classes

	return (
		<ContainerInt>
			<h2 className={title}>Lore</h2>
			{readMore ? (
				<p className={text}>
					{lore}{" "}
					<span>
						<button
							className={readToggle}
							onClick={(e) => setReadMore(!readMore)}
						>
							(contract...)
						</button>
					</span>
				</p>
			) : (
				<p className={text}>
					{blurb}{" "}
					<span>
						<button
							className={readToggle}
							onClick={(e) => setReadMore(!readMore)}
						>
							(expand...)
						</button>
					</span>
				</p>
			)}
		</ContainerInt>
	)
}

export default ChampionLore
