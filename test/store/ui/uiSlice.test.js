import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice';


describe('Pruebas en uiSlice', () => {
	test('debe de regregar el estado por defecto', () => {
		expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })
		//* esperamos que el getInitialState sea igual a isDateModelOpen false
	})
	test('debe de cambiar el isDateModalOpen correctamente', () => {
		let state = uiSlice.getInitialState();
		//* obtenemos el estado inicial
		state = uiSlice.reducer(state, onOpenDateModal()) //* true
		//* esperamos que sea verdadero
		expect(state.isDateModalOpen).toBeTruthy();
		//* objetemos el estado de onCloseModal
		state = uiSlice.reducer(state, onCloseDateModal()) //* false
		//* esperamos que sea falso
		expect(state.isDateModalOpen).toBeFalsy();
	})

});