import "./App.css"
import SummonerSearch from "./context/SummonerSearchContext"
import AppRouter from "./routes/AppRouter"

function App() {
	return (
		<>
			<SummonerSearch>
				<AppRouter />
			</SummonerSearch>
		</>
	)
}

export default App
