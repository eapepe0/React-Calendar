import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithActiveEventsState, calendarWithEventsState, events, initialState } from '../../fixtures/calendarStates';


describe('Pruebas en calendarSlice', () => {
	test('debe de regresar el estado por defecto', () => {
		//* obtenemos el estado inicial
		const state = calendarSlice.getInitialState()
		//* comparamos que sea igual al estado inicial de nuestro archivo calendarStates
		expect(state).toEqual(initialState)
	})

	test('onSetActiveEvent debe de activar el evento ', () => {
		//* hacemos que nuestro estado desde calendarWithEventsState , ponemos en activo de la lista de eventos el del index 0
		const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]))
		//* comparamos que sea igual al array en la posicion 0
		expect(state.activeEvent).toEqual(events[0])
	})

	test('onAddNewEvent debe de agregar el evento', () => {
		//* creamos un nuevo evento
		const newEvent = {
			id: '3',
			start: new Date('2023-01-03 00:00:00'),
			end: new Date('2023-01-03 02:00:00'),
			title: 'Titulo 3',
			notes: 'Nota 3',
		}
		//* agregamos el nuevo evento , dentro del calendarWithEventsState
		const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent))
		//* esperamos que nuestros eventos sean igual a un array con un spread de eventos , con nuestro newEvent agregado
		expect(state.events).toEqual([...events, newEvent])
	})

	test('onUpdateEvent debe de actualizar el evento', () => {
		//* nota actualizada , actualizamos la nota 1 (id : 1)
		const updatedEvent = {
			id: '1',
			start: new Date('2023-01-03 00:00:00'),
			end: new Date('2023-01-03 02:00:00'),
			title: 'Titulo 3 actualizada',
			notes: 'Nota 3 actualizada',
		}
		//* creamos un estado , donde nuestro estado calendarWithEventsState se le actualiza el nuevo evento
		const state = calendarSlice.reducer(calendarWithEventsState, onUpdateEvent(updatedEvent))
		//* esperamos que los eventos de nuestro estado contengan el evento actualizado
		expect(state.events).toContain(updatedEvent)
	})
	test('debe de borrar el evento activo onDeleteEvent ', () => {
		//* evento a borrar
		const deletedEvent = {
			id: '1',
			start: new Date('2023-01-01 00:00:00'),
			end: new Date('2023-01-01 02:00:00'),
			title: 'asdf',
			notes: 'fdsa',
		}
		//* obtenemos el estado y borramos el evento borrado
		const state = calendarSlice.reducer(calendarWithActiveEventsState, onDeleteEvent(deletedEvent))
		//* 
		expect(state.events).not.toContain(deletedEvent)
	})

	test('onLoad events , debe de establecer los eventos', () => {
		const state = calendarSlice.reducer(initialState, onLoadEvents(events))
		expect(state.isLoadingEvents).toBeFalsy();
		expect(state.events).toEqual(events)
	})

	test('onLogoutCalendar debe de limpiar el estado', () => {
		const state = calendarSlice.reducer(calendarWithActiveEventsState, onLogoutCalendar())
		expect(state).toEqual(initialState)
	})




});