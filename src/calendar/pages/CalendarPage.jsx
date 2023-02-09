import React, { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'
import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../'
import { getMessagesES, localizer } from '../../helpers'
import { useUiStore } from '../../hooks/useUiStore'
import { useCalendarStore } from '../../hooks'


export const CalendarPage = () => {
	//* si no tenemos un item lastView en el localStorage , sera month por defecto
	const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

	//* sacamos del store si vamos a abrir el modal
	const { openDateModal } = useUiStore();

	const { events, setActiveEvent } = useCalendarStore();
	//* cargamos estilos a los eventos del calendario
	const eventStyleGetter = (event, start, end, isSelected) => {
		const style = {
			backgroudColor: "#347cf7",
			borderRadius: '2px',
			opacity: 0.8,
			color: 'white'
		}
		return {
			style
		}

	}

	//* si hacemos un doble click en un evento del calendario
	const onDobleClick = (event) => {
		openDateModal()
	}
	//* si hacemos un solo click en un evento del calendario
	const onSelect = (event) => {
		console.log({ OnClick: event })
		setActiveEvent(event)
	}

	//* si cambiamos de vista en el calendario (vista seria , dia, semana , mes, agenda)
	const onViewChanged = (event) => {
		localStorage.setItem('lastView', event) // metemos en el localStorage , en el itemLastView el evento 
		setLastView(event)
	}
	return (
		<>
			<Navbar />
			<Calendar
				culture='es'
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 'calc(100vh - 80px)' }} /* le sacamos los 80px del navbar */
				messages={getMessagesES()} // ponemos todo en idioma español
				eventPropGetter={eventStyleGetter} // cargamos los estilos en los eventos
				components={{
					event: CalendarEvent,
				}}// cargamos como queremos que se vean los eventos
				onDoubleClickEvent={onDobleClick}
				onSelectEvent={onSelect}
				defaultView={lastView} // cargamos cual seria la vista por defecto
				onView={onViewChanged}
			/>
			<CalendarModal />
			<FabAddNew />
			<FabDelete />
		</>
	)
}
