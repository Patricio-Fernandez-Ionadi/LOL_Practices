import { Route, Switch } from 'react-router-dom'
import './App.css'
import SearchBar from './components/SearchBar'
import Home from './routes/Home'
import Champions from './routes/champions/Champions'
import Champion from './routes/champions/Champion'
import SummonerStats from './routes/summoner/SummonerStats'

function LolApp() {
	return (
		<>
			<SearchBar />
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
