import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
// Pages
import Home from "./Home"
import Champion from "./champions/Champion"
import Champions from "./champions/Champions"
import SummonerStats from "./summoner/SummonerStats"

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/champions' component={Champions} />
				<Route exact path='/champions/:champion' component={Champion} />
				<Route exact path='/summoner/:summonerName' component={SummonerStats} />
			</Switch>
		</Router>
	)
}

export default AppRouter
