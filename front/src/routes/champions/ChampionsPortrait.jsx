import { makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import { color } from "../../environment"

const useStyles = makeStyles({
	link: {
		color: color.gold.regular,
		fontWeight: "bold",
		textDecoration: "none",
		textShadow: `0 0 3px ${color.base.teal.blacked}`,
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
	},
	nameAndAsset: {
		width: "95px",
		height: "95px",
		position: "relative",
		top: "18px",
		left: "17px",
		borderRadius: "50%",
		// boxShadow: `0px 0px 10px .2em ${color.base.dark}, 0px 0px 20px .8em ${color.base.dark}`,
		overflow: "hidden",
	},
	champAsset: {
		borderRadius: "50%",
		width: "105px",
		position: "relative",
		left: "-4px",
		top: "-4px",
	},
	champName: {
		position: "absolute",
		bottom: "10px",
		left: "50%",
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
				<div className={classes.nameAndAsset}>
					<img
						className={classes.champAsset}
						src={`http://ddragon.leagueoflegends.com/cdn/11.23.1/img/champion/${each.image.full}`}
						alt='champ splash loading'
					/>
					<span className={classes.champName}>{name}</span>
				</div>
			</div>
		</Link>
	)
}

export default ChampionsPortrait
