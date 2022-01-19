export const summonerReducer = (state, action) => {
	switch (action?.type) {
		case 'addSummoner': {
			const newSummoner = action.payload

			const alreadySearched = state.summoners.find(
				(e) => e?.name === newSummoner?.name
			)

			if (newSummoner?.name !== alreadySearched?.name) {
				return {
					...state,
					summoners: [...state.summoners, newSummoner],
				}
			}

			return { ...state }
		}
		default:
			return state
	}
}
