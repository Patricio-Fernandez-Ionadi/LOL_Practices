import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import LolApp from './LolApp'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChampionsContextProvider } from './context/Champions/ChampionsContextProvider'

ReactDOM.render(
	<Router>
		<ChampionsContextProvider>
			<LolApp />
		</ChampionsContextProvider>
	</Router>,
	document.getElementById('root')
)
