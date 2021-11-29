import { makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import { color } from "../../environment"

const useStyles = makeStyles({
	link: {
		color: color.gold.lighter,
		fontWeight: "bold",
		textDecoration: "none",
		textShadow: `0 0 20px ${color.gold.dark}`,
	},
	champStamp: {
		position: "relative",
		width: "130px",
		height: "140px",
		marginBottom: "1px",
	},
	portrait: {
		position: "absolute",
		width: "130px",
		zIndex: "10",
		// boxShadow: `0 0 10px 10px ${color.base.medium} inset`,
	},
	champAsset: {
		display: "block",
		position: "relative",
		top: "20px",
		left: "20px",
		width: "90px",
		borderRadius: "50%",
		boxShadow: `0px 0px 8px 8px ${color.base.dark}`,
	},
	champName: {
		position: "absolute",
		bottom: "40px",
		left: "65px",
		transform: "translateX(-50%)",
	},
})

const ChampionsPortrait = ({ name, id, each }) => {
	const classes = useStyles()
	return (
		<Link
			className={classes.link}
			to={{
				pathname: `/champions/${id}`,
				state: id,
			}}
		>
			<div className={classes.champStamp}>
				<img
					className={classes.portrait}
					src={`./assets/portrait-frame.png`}
					alt='prtrait-frame'
				/>
				<img
					className={classes.champAsset}
					src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${each.image.full}`}
					alt='champ splash loading'
				/>
				<span className={classes.champName}>{name}</span>
			</div>
		</Link>
	)
}

export default ChampionsPortrait
