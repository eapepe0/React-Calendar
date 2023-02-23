import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {

	const { status, user, errorMessage } = useSelector(state => state.auth); //* Extraemos los datos de AuthSlice
	const dispatch = useDispatch()

	const startLogin = async ({ email, password }) => {

		dispatch(onChecking()); //* chequeamos las credenciales
		try { //* probamos
			const { data } = await calendarApi.post('/auth/', { email, password }) //* si lo que devuelve es correcto
			localStorage.setItem('token', data.token); //* guardamos el token en el storage
			localStorage.setItem('token-init-date', new Date().getTime()); //* guardamos la fecha de creacion del token
			dispatch(onLogin({ name: data.name, uid: data.uid })) //* cambiamos el estado el login con sus datos
		} catch (error) {
			dispatch(onLogout('Credenciales no validas')) //* cambia el estado a not-authenticated y muestra un error
			setTimeout(() => {
				dispatch(clearErrorMessage()) //* esperamos 1 seg y borramos el error
			}, 10);
		}
	}

	const startRegister = async ({ name, email, password }) => {
		dispatch(onChecking());
		try {
			const { data } = await calendarApi.post('/auth/new', { name, email, password })
			console.log({ data })

			localStorage.setItem('token', data.token); //* guardamos el token en el storage
			localStorage.setItem('token-init-date', new Date().getTime()); //* guardamos la fecha de creacion del token

			dispatch(onLogin({ name: data.name, uid: data.uid }))

			Swal('Creacion de Usuario', 'El usuario fue creado exitosamente', 'success')
		} catch (error) {
			console.log(error)
			dispatch(onLogout(error.response.data?.msg || ''))
			setTimeout(() => {
				dispatch(clearErrorMessage())
			}, 10);
		}
	}

	const checkAuthToken = async () => {
		const token = localStorage.getItem('token') //* obtenemos el token
		console.log(token)
		if (!token) return dispatch(onLogout())//* si el token no existe nos saca con el logout, no mostramos ningun mensaje asi no salta el modal

		try {
			const { data } = await calendarApi.get('auth/renew') //* llamamos el renew
			console.log({ data })

			localStorage.setItem('token', data.token); //* guardamos el token en el storage
			localStorage.setItem('token-init-date', new Date().getTime()); //* guardamos la fecha de creacion del token

			dispatch(onLogin({ name: data.name, uid: data.uid })) //* nos volvemos a loguear con los datos nuevos

		} catch (error) { //* si hay algun error
			localStorage.clear()  //* nos borra el localStorage
			dispatch(onLogout(error.response.data?.msg || '')) //* nos saca y nos muestra el error
		}
	}

	const startLogout = () => {
		localStorage.clear() //* borramos el localStorage
		dispatch(onLogout()) //* salimos
	}

	return {
		//* Propiedades
		errorMessage,
		user,
		status,
		//* Metodos
		startLogin,
		startRegister,
		startLogout,
		checkAuthToken
	}
}