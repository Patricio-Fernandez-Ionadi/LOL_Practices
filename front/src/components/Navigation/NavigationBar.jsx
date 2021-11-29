import { useState } from "react"
import NavButton from "./NavButton"

const NavigationBar = () => {
	const [anchorEl, setAnchorEl] = useState()

	const handlerNav = (e) => {
		setAnchorEl(null)
		setAnchorEl(e.target)
	}

	return (
		<nav>
			<NavButton
				path='/'
				label='Home'
				clickEvent={handlerNav}
				anchorEl={anchorEl}
			/>
			<NavButton
				path='/champions'
				label='Champions'
				clickEvent={handlerNav}
				anchorEl={anchorEl}
			/>
		</nav>
	)
}

export default NavigationBar
