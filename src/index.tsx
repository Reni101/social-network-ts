import React from 'react'
import { store } from './Redux/Redux-store'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { App } from './App'

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<App />
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
