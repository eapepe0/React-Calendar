import { useUiStore } from '../../src/hooks';
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux';
import { uiSlice } from '../../src/store';
import { configureStore } from '@reduxjs/toolkit';


const getMockStore = (initialState) => {
	return configureStore({
		reducer: {
			ui: uiSlice.reducer
		},
		preloadedState: {
			ui: { ...initialState }
		}
	})
}

describe('Pruebas en useUiStore', () => {
	test('debe de regresar los valores por defecto', () => {
		//* creamos un mock del store , aca podemos variar como se inicializaria el store
		const mockStore = getMockStore({ isDateModalOpen: false })
		//* renderizamos el hook con el wrapper que seria el provider
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
		});

		expect(result.current).toEqual({
			isDateModalOpen: false,
			openDateModal: expect.any(Function),
			closeDateModal: expect.any(Function)
		});

	});

	test('openDatemodal debe de colocar true en el isDateModalOpen', () => {
		const mockStore = getMockStore({ isDateModalOpen: false })
		//* renderizamos el hook con el wrapper que seria el provider
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
		});

		//* extraemos  la funcion que se encarga de abrir el modal , isDateModalOpen seria falso hasta este punto
		const { openDateModal } = result.current
		act(() => {
			openDateModal(); //* ejecturamos la funcion 
		})
		//* isDateModalOpen seria true
		expect(result.current.isDateModalOpen).toBeTruthy();
	})

	test('closeModal debe de colocar false en el isDateModalOpen', () => {
		const mockStore = getMockStore({ isDateModalOpen: true })
		//* renderizamos el hook con el wrapper que seria el provider
		const { result } = renderHook(() => useUiStore(), {
			wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
		});

		//* extraemos  la funcion que se encarga de abrir el modal , isDateModalOpen seria falso hasta este punto
		const { closeDateModal } = result.current
		act(() => {
			closeDateModal(); //* ejecturamos la funcion 
		})
		//* isDateModalOpen seria true
		expect(result.current.isDateModalOpen).toBeFalsy();
	})
});