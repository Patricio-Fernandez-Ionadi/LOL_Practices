import React from 'react'

import styles from './styles.module.css'

export const ChampionHero = ({ images, lore, blurb, info }) => {
	return (
		<section>
			<div className={styles.heroContainer}>
				<img
					className={styles.heroBackground}
					src={images.splash[0]}
					alt='champion-background-filtered'
				/>

				<img
					className={styles.hero}
					src={images.splash[0]}
					alt='champion-background-filtered'
				/>
				<div className={styles.heroOverlay}></div>
			</div>
			<div className={styles.contentContainer}>
				<div className={styles.contentRolContainer}>
					<div className={styles.contentRol}>Rol</div>
					<div className={styles.contentDiff}>{info.difficulty}</div>
				</div>
				<div className={styles.contentLore}>
					{blurb || lore}
					<button>ver mas...</button>
				</div>
			</div>
		</section>
	)
}
