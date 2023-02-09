import React from 'react'
import { AppRouter } from './router/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'



export const CalendarApp = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</Provider>
	)
}

/**
|--------------------------------------------------
| Aca envolvemos el AppRouter con el Router Global (BrowserRouter)
|--------------------------------------------------
*/