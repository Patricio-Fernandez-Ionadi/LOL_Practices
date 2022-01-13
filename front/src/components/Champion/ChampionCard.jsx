import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.module.css'

export const ChampionCard = ({ id, images }) => {
	return (
		<Link
			to={`/champions/${id}`}
			className={styles.individualCardContainer}
			key={id}
		>
			<div className={styles.cardPortrait}></div>
			<div className={styles.card}>
				<img className={styles.champAvatar} src={images.avatar[0]} alt={id} />
			</div>
		</Link>
	)
}

/* 
<div className={styles.individualCardContainer}>
	<div className={styles.cardPortrait}></div>
	<div className={`${styles.card} ${styles.loading}`}></div>
</div>
 */
