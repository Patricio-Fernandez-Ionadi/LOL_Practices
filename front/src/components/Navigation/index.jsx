import React from 'react'
import { Link } from 'react-router-dom'
export const Navigation = () => {
	return (
		<div>
			<Link to={`/`}>Inicio</Link>
			<Link to={`/champions`}>Champions</Link>
		</div>
	)
}
