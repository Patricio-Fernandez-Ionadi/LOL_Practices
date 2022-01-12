import { Route, Switch } from 'react-router-dom'
// import SearchBar from './components/SearchBar'
import { Home } from './pages'
import Champions from './routes/champions/Champions'
import Champion from './routes/champions/Champion'
import SummonerStats from './routes/summoner/SummonerStats'

function LolApp() {
	return (
		<>
			{/* <SearchBar /> */}
			<Switch>
				<Route exact path='/champions' component={Champions} />
				<Route exact path='/champions/:champion' component={Champion} />
				<Route exact path='/summoner/:summonerName' component={SummonerStats} />
				<Route exact path='/' component={Home} />
			</Switch>
		</>
	)
}

export default LolApp
