import React from "react"
import { makeStyles } from "@material-ui/core"
import { color } from "../../environment"

const useStyles = makeStyles({
	bannerContainer: {
		width: "104%",
		height: "1000px",
		maxHeight: "50vh",
		position: "relative",
		left: "-2%",
		overflow: "hidden",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "30px",
	},
	bannerImage: {
		position: "absolute",
		top: "-25px",
		minWidth: "100%",
		maxWidth: "100%",
		display: "block",
	},
	champTitle: {
		position: "absolute",
		top: 0,
		left: 0,
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
				<h1>{name}</h1>
				<small>{title}</small>
			</div>
		</div>
	)
}

export default ChampionBanner
