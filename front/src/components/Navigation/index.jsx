import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.css'

export const Navigation = () => {
	return (
		<div className={styles.navigation}>
			<Link to={`/`}>Inicio</Link>
			<Link to={`/champions`}>Champions</Link>
		</div>
	)
}
