import React from "react"
import { makeStyles } from "@material-ui/core"
import { color } from "../../environment"

const useStyles = makeStyles({
	bannerContainer: {
		width: "100%",
		maxHeight: "100vh",
		position: "relative",
		overflow: "hidden",
	},
	bannerImage: {
		minWidth: "100%",
		maxWidth: "100%",
	},
	champTitle: {
		position: "absolute",
		top: 0,
		left: 0,
		"& p, small": {},
		color: color.white,
	},
})

const ChampionBanner = ({ id, name, title }) => {
	const classes = useStyles()
	return (
		<div className={classes.bannerContainer}>
			<img
				src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_0.jpg`}
				alt='champion-splahart'
				className={classes.bannerImage}
			/>
			<div className={classes.champTitle}>
				<p>{name}</p>
				<small>{title}</small>
			</div>
		</div>
	)
}

export default ChampionBanner
