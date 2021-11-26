import { useContext } from "react"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import { SearchingSummonerContext } from "../context/SummonerSearchContext"
import Champions from "./champions/Champions"
import SummonerStats from "./summoner/SummonerStats"

const AppRouter = () => {
	const summonerContext = useContext(SearchingSummonerContext)
	const { summoner } = summonerContext

	return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to={`/`}>Home</Link>
					</li>
					<li>
						<Link to={`/summoner/${summoner}`}>Last Summoner Searched</Link>
					</li>
					<li>
						<Link to={`/champions`}>Champions</Link>
					</li>
				</ul>
			</nav>
			<SearchBar />

			<Switch>
				<Route path='/champions' component={Champions} />
				<Route path='/summoner/:summonerName' component={SummonerStats} />
			</Switch>
		</Router>
	)
}

export default AppRouter
