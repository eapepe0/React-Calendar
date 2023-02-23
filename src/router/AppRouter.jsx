import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

	//* Aca decidiremos si mostrar las rutas publicas o privadas , dependiendo de si estas logueado o no


	const { status, checkAuthToken } = useAuthStore();

	useEffect(() => {
		checkAuthToken(); //* usamos la funcion de checkear el token , cada vez que se carga la app
	}, [])



	if (status === 'checking') { //* si estamos checkeando , mostramos un mensaje
		return (
			<h3>Cargando ...</h3>
		)
	}
	return (
		<Routes>
			{
				(status === 'not-authenticated') //* si sale que no estamos autenticados
					? (
						<>
							<Route path='/auth/*' element={<LoginPage />} /> //* vamos a la pagina de Login si no estoy autenticado
							<Route path='/*' element={<Navigate to='/auth/login' />} />
						</>
					)
					: ( //* si estoy autenticado
						<>
							<Route path='/' element={<CalendarPage />} /> //* vamos a la pagina principal
							<Route path='/*' element={<Navigate to='/' />} /> //* cualquier otra pagina nos lleva a la pagina principal
						</>
					)
			}


		</Routes>
	)
}

/**
|--------------------------------------------------
 Cada vez que alguien entre y no este autenticado , le va a renderizar LoginPage
 Cada vez que alguien entre y este autenticado , le va a renderizar el CalendarPage
|--------------------------------------------------
*/