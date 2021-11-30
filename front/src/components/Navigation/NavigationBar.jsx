import { useState } from "react"
import NavButton from "./NavButton"

const NavigationBar = ({ routes }) => {
	const [anchorEl, setAnchorEl] = useState()

	const handlerNav = (e) => {
		setAnchorEl(null)
		setAnchorEl(e.target)
	}

	const navigation = {
		position: "fixed",
		top: 0,
		height: "60px",
		width: "100%",
		zIndex: 999,
	}

	return (
		<nav style={navigation}>
			{routes.map((each) => {
				const { path, label, name } = each
				return (
					<NavButton
						key={name}
						path={path}
						label={label}
						clickEvent={handlerNav}
						anchorEl={anchorEl}
					/>
				)
			})}
		</nav>
	)
}

export default NavigationBar
