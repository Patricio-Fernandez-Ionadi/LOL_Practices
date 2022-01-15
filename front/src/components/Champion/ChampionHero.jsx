import React, { useState } from 'react'

import styles from './styles.module.css'

export const ChampionHero = ({ images, lore, blurb, info, title, name }) => {
	const [verMas, setVerMas] = useState(false)

	return (
		<section>
			<div className={styles.heroContainer}>
				<img
					className={styles.heroBackground}
					src={images.splashes[0]}
					alt='champion-background-filtered'
				/>

				<img
					className={styles.hero}
					src={images.splashes[0]}
					alt='champion-background-filtered'
				/>
				<div className={styles.heroOverlay}></div>
			</div>

			<div className={styles.contentContainer}>
				<div className={styles.contentTitle}>
					<span>{title}</span>
					<h1>{name}</h1>
				</div>

				<div className={styles.contentSpecs}>
					<div className={styles.contentRol}>Rol</div>
					<div className={styles.contentDiff}>{info.difficulty}</div>
				</div>

				<div className={styles.divider}></div>

				<div className={styles.contentLore}>
					{verMas ? (
						<p>{lore}</p>
					) : (
						<p>
							{blurb}
							<button onClick={() => setVerMas(!verMas)}>ver mas...</button>
						</p>
					)}
				</div>

				<div className={styles.relatedLinks}>
					<span>Maestria de campeones</span>
					<span>LagueOfGraphs.com</span>
					<span>op.gg</span>
					<span>ProBuilds.Net</span>
				</div>
			</div>
		</section>
	)
}
