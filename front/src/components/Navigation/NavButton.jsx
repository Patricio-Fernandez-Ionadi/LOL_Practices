import React from "react"
import { makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import { color } from "../../environment"

const useStyles = makeStyles({
	button: {
		outline: "none",
		border: "none",
		background: color.btn.background,
		height: "30px",
		minWidth: "80px",
		margin: "5px",
		transition: "all 1s ease",
		"& a": {
			display: "block",
			padding: "4px",
			height: "100%",
			border: `2px solid ${color.base.teal.dark}`,
			with: "calc(100% + 4px)",
			lineHeight: "20px",
			color: color.btn.text.regular,
			textDecoration: "none",
			fontWeight: "bold",
			transition: "color 1s ease",
		},
	},
	active: {
		backgroundColor: color.base.teal.blacked,
		"& a": {
			borderColor: color.base.teal.regular,
			color: color.btn.text.light,
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
