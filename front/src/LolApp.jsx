import { Route, Switch } from 'react-router-dom'
import { Navigation } from './components/Navigation'

import { Champion, Home, Champions } from './pages'

function LolApp() {
	return (
		<>
			<Navigation />
			<main>
				<Switch>
					<Route exact path='/champions' component={Champions} />
					<Route exact path='/champions/:champion' component={Champion} />
					<Route exact path='/' component={Home} />
				</Switch>
			</main>
		</>
	)
}

export default LolApp
