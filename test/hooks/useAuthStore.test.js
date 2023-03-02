import { configureStore } from "@reduxjs/toolkit";
import { useAuthStore } from "../../src/hooks";
import { authSlice } from "../../src/store/auth/authSlice";
import { renderHook, act, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux';
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUsersCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en useAuthStore', () => {
    test('Debe devolver los valores por defecto', () => {

        const mockStore = getMockStore({ ...initialState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            startLogout: expect.any(Function),
            checkAuthToken: expect.any(Function),
        },);
    })

    test('startLogin debe de realizar el login correctamente', async () => {
        localStorage.clear()//* borramos el local storage
        const mockStore = getMockStore({ ...notAuthenticatedState }) //* inicializamos el store con no estamos autenticados
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        await act(async () => { //* enviamos la funcion startLogin la cual es asincrona
            await result.current.startLogin(testUsersCredentials); //* ejecturamos la funcion la cual extraemos del resultado del hook
        })

        const { errorMessage, status, user } = result.current; //* extraemos estos resultados
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '63f9a83187d905a6098a8878' }
        }) //* esperamos que sea asi
        expect(localStorage.getItem('token')).toEqual(expect.any(String)) //* esperamos que haya una string en token
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String)) //* esperamos que haya una string en token-init-date
    })

    test('startLogin debe de realizar el login incorrectamente', async () => {
        localStorage.clear()//* borramos el local storage
        const mockStore = getMockStore({ ...notAuthenticatedState }) //* inicializamos el store con no estamos autenticados
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });
        await act(async () => { //* enviamos la funcion startLogin la cual es asincrona
            await result.current.startLogin({ email: 'usuarioerroneo@gmail.com', password: '12345678' }); //* ejecturamos la funcion la cual extraemos del resultado del hook con credenciales erroneas
        })

        const { errorMessage, status, user } = result.current; //* extraemos del resultado
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales no validas',
            status: 'not-authenticated',
            user: {}
        }) //* esperamos que esto sea asi
        expect(localStorage.getItem('token')).toBe(null) //* al fallar no deberia grabar nada en el token
        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined) //* experamos que se ejecute la funcion clearErrorMessage que esta dentro de un setTimeout la cual pone el errorMessage en undefined
        )
    })

    test('startRegister debe de crear un usuario', async () => {
        localStorage.clear()//* borramos el local storage
        const newUser = { email: 'usuarioerroneo@gmail.com', password: '12345678', name: 'Test User2' }
        const mockStore = getMockStore({ ...notAuthenticatedState }) //* inicializamos el store con no estamos autenticados
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                msg: 'registro , usuario creado',
                uid: '63ffd7f9d654dad83c7c7843',
                name: 'Test User2',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2ZmZDdmOWQ2NTRkYWQ4M2M3Yzc4NDMiLCJuYW1lIjoiVGVzdCBVc2VyMiIsImlhdCI6MTY3NzcxMTM1MywiZXhwIjoxNjc3NzE4NTUzfQ.ssiT4GBQN0vltJWQMovFDF5v7klk1TGB34gpUnE03VE'
            }
        }) //* evitamos el post de la funcion startRegister

        await act(async () => { //* enviamos la funcion startLogin la cual es asincrona
            await result.current.startRegister(newUser); //* ejecturamos la funcion la cual extraemos del resultado del hook con credenciales erroneas
        })
        const { errorMessage, status, user } = result.current; //* extraemos
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User2', uid: '63ffd7f9d654dad83c7c7843' }
        }) //* lo que debemos esperar

        spy.mockRestore(); //* esto hace que destruyamos el espia si tenemos alguna funcion que llame a la api no se vea intervenida por este spy
    })

    test('startRegister debe fallar', async () => {
        localStorage.clear()//* borramos el local storage

        const mockStore = getMockStore({ ...notAuthenticatedState }) //* inicializamos el store con no estamos autenticados
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });


        await act(async () => { //* enviamos la funcion startLogin la cual es asincrona
            await result.current.startRegister(testUsersCredentials); //* ejecturamos la funcion la cual extraemos del resultado del hook con credenciales erroneas
        })
        const { errorMessage, status, user } = result.current; //* extraemos

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Un usuario existe con ese correo!!!',
            status: 'not-authenticated',
            user: {}
        }) //* lo que debemos esperar */


    })

    test('chechAuth token debe fallar si no hay token', async () => {
        localStorage.clear()//* borramos el local storage

        const mockStore = getMockStore({ ...initialState }) //* inicializamos el store con no estamos autenticados
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });


        await act(async () => { //* enviamos la funcion startLogin la cual es asincrona
            await result.current.checkAuthToken(); //* ejecturamos la funcion la cual extraemos del resultado del hook con credenciales erroneas
        })

        const { errorMessage, status, user } = result.current; //* extraemos
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        }) //* lo que debemos esperar */
    })
    test('chechAuth token debe autenticar si hay token', async () => {
        const { data } = await calendarApi.post('/auth', testUsersCredentials)
        localStorage.setItem('token', data.token)

        const mockStore = getMockStore({ ...initialState }) //* inicializamos el store con no estamos autenticados
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });


        await act(async () => { //* enviamos la funcion startLogin la cual es asincrona
            await result.current.checkAuthToken(); //* ejecturamos la funcion la cual extraemos del resultado del hook con credenciales erroneas
        })

        const { errorMessage, status, user } = result.current; //* extraemos
        console.log({ errorMessage, status, user })

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '63f9a83187d905a6098a8878' }
        })
    })



});