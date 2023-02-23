import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import {
	onAddNewEvent,
	onDeleteEvent,
	onSetActiveEvent,
	onUpdateEvent,
	onLoadEvents
} from "../store";
import { convertEventsToDateEvents } from '../helpers'
import Swal from "sweetalert2";


export const useCalendarStore = () => {
	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth)

	//* sacamos los eventos y el evento activo

	const setActiveEvent = (calendarEvent) => {
		//* Cambiamos el evento activo por el evento que recibimos
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async (calendarEvent) => {
		try {
			//* Recibimos el evento
			///* si el evento tiene un id
			if (calendarEvent.id) {
				//* llamamos al endpoint de actualizar el evento
				await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
				//*actualizando el evento y le agregamos el usuario activo
				dispatch(onUpdateEvent({ ...calendarEvent, user }));
				//* una vez que actualizamos salimos y no se ejecuta lo de abajo
				return;
			}

			//*creando un nuevo evento
			//* hacemos una peticion al endpoint events , con los datos del calendarEvent = {title , start , end , notes}
			const { data } = await calendarApi.post('/events', calendarEvent)
			console.log({ data })
			dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
			//* creamos un nuevo evento al cual le agregamos un nuevo id , que ya viene creado en el data , y el usuario autenticado que sacamos de authSlice

		} catch (error) {
			console.log(error.response.data.msg)
			Swal.fire('Error al guardar', error.response.data?.msg, 'error')
		}
	};

	const startDeletingEvent = async () => {
		try {
			//* enviamos una peticion delete al endpoint delete, con el id del evento activo (eventoClickeado)
			await calendarApi.delete(`/events/${activeEvent.id}`, activeEvent)
			dispatch(onDeleteEvent());
		} catch (error) {
			//* si hay algun error mostramos cual fue el causante
			console.log(error.response.data.msg)
			Swal.fire('Error al borrar el evento', error.response.data?.msg, 'error')
		}
		//* Borramos un evento

	};

	const startLoadingEvents = async () => {
		try {
			//* obtenemos los eventos
			const { data } = await calendarApi.get('/events')
			const events = convertEventsToDateEvents(data.eventos) //* convertimos las fechas de los eventos a una que acepte el componente calendar
			dispatch(onLoadEvents(events)) //* cargamos los eventos que son cargados por el backend
		} catch (error) {
			console.log('Error Cargando eventos')
			console.log(error)
		}
	}
	return {
		//* props
		activeEvent,
		events,
		hasEventSelected: !!activeEvent, // si es null regresa falso y si esta cargado con algo regresa true
		//* method
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents
	};
};
