import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import LolApp from './LolApp'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
	<Router>
		<LolApp />
	</Router>,
	document.getElementById('root')
)
