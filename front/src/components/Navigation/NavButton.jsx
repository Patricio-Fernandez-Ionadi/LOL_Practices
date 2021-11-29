import React from "react"
import { makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import { color } from "../../environment"

const useStyles = makeStyles({
	button: {
		outline: "none",
		border: "none",
		background: color.base.dark,
		height: "30px",
		width: "80px",
		margin: "5px",
		transition: "all .3s ease",
		"& a": {
			display: "block",
			height: "100%",
			border: `2px solid ${color.brown.light}`,
			// backgroundColor: "yellow",
			with: "calc(100% + 4px)",
			lineHeight: "26px",
			color: color.brown.light,
			textDecoration: "none",
			fontWeight: "bold",
			transition: "color .2s ease",
		},
		"&:hover": {
			backgroundColor: color.strecheableArea.on,
			"& a": {
				color: color.blue.light,
			},
		},
	},
	active: {
		backgroundColor: color.blue.light,
		"& a": {
			color: "#222",
		},
	},
})

const NavButton = ({ path, label, clickEvent, anchorEl }) => {
	let isActiveButton = anchorEl?.attributes.href.value === path
	const classes = useStyles()

	return (
		<button
			className={`${classes.button}
      ${isActiveButton ? classes.active : "default"}`}
			onClick={clickEvent}
		>
			<Link to={path}>{label}</Link>
		</button>
	)
}

export default NavButton
