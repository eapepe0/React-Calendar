import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState, notAuthenticatedState } from '../../fixtures/authStates';
import { testUsersCredentials } from '../../fixtures/testUser';

describe('Pruebas en authSlice', () => {
	test('debe regresar el estado inicial', () => {
		//* esperamos que el estado inicial de authSlice coincida con el estado inicial de authStates
		expect(authSlice.getInitialState()).toEqual(initialState)
	})
	test('debe de realizar un login', () => {
		//* Creamos un estado cuando el authSlice hace login con los parametros de test
		const state = authSlice.reducer(initialState, onLogin(testUsersCredentials))
		//* esperamos que el estado sea igual a esto
		expect(state).toEqual({
			status: 'authenticated',
			user: testUsersCredentials,
			errorMessage: undefined
		})
	})

	test('debe de realizar un logout', () => {
		//* Creamos un estado cuando el authSlice hace logout con los parametros de test
		const state = authSlice.reducer(authenticatedState, onLogout())
		//* esperamos que el estado sea igual al notAuthenticatedState
		expect(state).toEqual(notAuthenticatedState)
	})

	test('debe de realizar un logout con un mensaje de error', () => {
		const errorMessage = 'Credencianos invalidas'
		//* Creamos un estado con el onLogout y tiene de parametro un errorMessage
		const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
		//* esperamos que sea igual a esto :
		expect(state).toEqual({
			status: 'not-authenticated', //* 'authenticated' , 'not-authenticated'
			user: {},
			errorMessage: errorMessage,
		})
	})

	test('debe de limpiar el mensaje de error', () => {
		const errorMessage = 'Credencianos invalidas'
		//* Creamos un estado con el onLogout y tiene de parametro un errorMessage
		const state = authSlice.reducer(authenticatedState, onLogout(errorMessage))
		//* aca el estado seria un-authenticated , y el error credenciales validas
		//* hacemos clearErrorMessage , por lo cual deberia ser igual , pero el errorMessage undefined
		const newState = authSlice.reducer(state, clearErrorMessage())
		expect(newState.errorMessage).toBe(undefined)

	})

	test('debe de realizar el checking', () => {
		//* sacamos el estado , desde ya autenticado , a Logout
		const state = authSlice.reducer(authenticatedState, onLogout())
		//* Creamos otro estado , donde estamos de logout a checking
		const newState = authSlice.reducer(state, onChecking())
		//* comparamos que el nuevo estado status sea igual a checking
		expect(newState.status).toEqual('checking')


	})
});