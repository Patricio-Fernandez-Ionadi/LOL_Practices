import React from "react"
import ContainerInt from "../../components/Layout/Container"

const ChampionSkins = ({ skins, id }) => {
	return (
		<ContainerInt>
			<h2>Skins</h2>
			<div style={{ display: "flex", maxWidth: "100%", flexWrap: "wrap" }}>
				{skins.map((skin) => {
					if (skin.num !== 0) {
						return (
							<div style={{ position: "relative" }} key={skin.id}>
								<img
									style={{ maxHeight: "400px" }}
									src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_${skin.num}.jpg`}
									alt='champSkin'
								/>
								<p
									style={{
										color: "#fff",
										position: "absolute",
										bottom: 0,
										left: "50%",
										transform: "translateX(-50%)",
									}}
								>
									{skin.name !== "default" ? skin.name : id}
								</p>
							</div>
						)
					} else {
						return false
					}
				})}
			</div>
		</ContainerInt>
	)
}

export default ChampionSkins
