import "./App.css"
import SummonerSearch from "./context/SummonerSearchContext"
import AppRouter from "./routes/AppRouter"
import AllChampionsProvider from "./services/getAllChampions"

function App() {
	return (
		<>
			<AllChampionsProvider>
				<SummonerSearch>
					<AppRouter />
				</SummonerSearch>
			</AllChampionsProvider>
		</>
	)
}

export default App
