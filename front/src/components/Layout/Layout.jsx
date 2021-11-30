import React from "react"
import { color } from "../../environment"

const globalStyles = {
	widh: "100%",
	paddingTop: "60px",
	minHeight: "100vh",
	backgroundColor: color.base.teal.blacked,
	zIndex: "-1",
}

const Layout = ({ children }) => {
	return <div style={globalStyles}>{children}</div>
}

export default Layout
