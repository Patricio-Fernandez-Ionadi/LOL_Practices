import React from "react"

const ContainerInt = ({ children, display }) => {
	const container = {
		width: "100%",
		padding: "2%",
		maxWidth: "1280px",
		display: display ? display : "inherit",
		margin: "0 auto",
	}

	return <div style={container}>{children}</div>
}

export default ContainerInt
