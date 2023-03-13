import React, { Suspense } from 'react'
import { store } from './Redux/redux-store'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { App } from './App'
import './i18n'
import { Preloader } from './common/Preloader/Preloader'

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Suspense fallback={Preloader}>
				<App />
			</Suspense>
		</HashRouter>
	</Provider>,
	document.getElementById('root')
)
