import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { fireEvent, render, screen } from '@testing-library/react'
import { useCalendarStore } from '../../../src/hooks';


//* mock a un paquete
jest.mock("../../../src/hooks/useCalendarStore")

describe('Pruebas en <FabDelete />', () => {
	const mockStartDeletingEvent = jest.fn();
	beforeEach(() => jest.clearAllMocks());
	beforeEach(() => jest.clearAllMocks());
	test('debe de mostrar el componente correctamente', () => {
		useCalendarStore.mockReturnValue({
			hasEventSelected: false
		})//* hacemos el mock de lo que retorna
		render(<FabDelete />); //* renderizamos
		screen.debug() //* mostramos en pantalla
		const btn = screen.getByLabelText('btn-delete') //* creamos un aria-label en el boton y lo extraemos en btn
		expect(btn.classList).toContain('btn') //* tiene que tener el class de btn
		expect(btn.classList).toContain('btn-danger')//* tiene que tener el class de btn-danger
		expect(btn.classList).toContain('fab-danger') //* tiene que tener el class de fab-danger
		expect(btn.style.display).toBe('none') //* tiene que tener el style de display none

	})

	test('debe de mostrar el boton si hay un evento activo', () => {
		useCalendarStore.mockReturnValue({
			hasEventSelected: true
		})//* hacemos el mock de lo que retorna
		render(<FabDelete />); //* renderizamos
		screen.debug() //* mostramos en pantalla
		const btn = screen.getByLabelText('btn-delete') //* creamos un aria-label en el boton y lo extraemos en btn
		expect(btn.style.display).toBe('') //* no tiene que tener style display none
	})

	test('debe de llamar startDeletingevent', () => {
		useCalendarStore.mockReturnValue({
			hasEventSelected: true
		})//* hacemos el mock de lo que retorna
		render(<FabDelete />); //* renderizamos
		screen.debug() //* mostramos en pantalla
		const btn = screen.getByLabelText('btn-delete') //* creamos un aria-label en el boton y lo extraemos en btn
		expect(btn.style.display).toBe('') //* no tiene que tener style display none
	})

	test('debe de llamar startDeletingevent si hay un evento activo', () => {
		useCalendarStore.mockReturnValue({
			hasEventSelected: true,
			startDeletingEvent: mockStartDeletingEvent, //* agregamos el mock del startDeletingEvent

		})//* hacemos el mock de lo que retorna
		render(<FabDelete />); //* renderizamos
		screen.debug() //* mostramos en pantalla
		const btn = screen.getByLabelText('btn-delete') //* creamos un aria-label en el boton y lo extraemos en btn
		fireEvent.click(btn) //* clickeamos el boton
		screen.debug()
		expect(mockStartDeletingEvent).toHaveBeenCalledWith() //* esperamos que el mock sea llamado
	})
});