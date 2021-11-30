import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Layout from "../components/Layout/Layout"
import NavigationBar from "../components/Navigation/NavigationBar"
import SearchBar from "../components/SearchBar"
import Champion from "./champions/Champion"
import Champions from "./champions/Champions"
import SummonerStats from "./summoner/SummonerStats"

const AppRouter = () => {
	return (
		<Router>
			<Layout>
				<NavigationBar />
				<SearchBar />

				<Switch>
					<Route exact path='/champions' component={Champions} />
					<Route exact path='/champions/:champion' component={Champion} />
					<Route
						exact
						path='/summoner/:summonerName'
						component={SummonerStats}
					/>
				</Switch>
			</Layout>
		</Router>
	)
}

export default AppRouter
