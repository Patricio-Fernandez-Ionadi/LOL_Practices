import React from "react"
import { color } from "../../environment"

const globalStyles = {
	widh: "100%",
	// maxWidth: "1280px",
	minHeight: "100vh",
	// padding: "80px 2% 0 2%",
	// position: " relative",
	// top: "-62px",
	// margin: "0 auto",
	backgroundColor: color.base.teal.blacked,
	zIndex: "-1",
}

const Layout = ({ children }) => {
	return <div style={globalStyles}>{children}</div>
}

export default Layout
