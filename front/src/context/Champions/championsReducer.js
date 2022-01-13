export const championsReducer = (state, action) => {
	switch (action?.type) {
		case 'setAllChamps':
			return [...action.payload]
		default:
			return state
	}
}
