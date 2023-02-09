import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
export const AppRouter = () => {
	const authStatus = 'authenticated';
	return (
		<Routes>
			{
				(authStatus === 'not-authenticated')
					? <Route path='/auth/*' element={<LoginPage />} />
					: <Route path='/*' element={<CalendarPage />} />
			}

			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	)
}

/**
|--------------------------------------------------
 Cada vez que alguien entre y no este autenticado , le va a renderizar LoginPage
 Cada vez que alguien entre y este autenticado , le va a renderizar el CalendarPage
|--------------------------------------------------
*/