import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

/* const tempEvent = {
	_id: new Date().getTime(),
	title: "Cumple de Hernan",
	notes: "Regalarle Algo",
	start: new Date(),
	end: addHours(new Date(), 2),
	bgColor: "#fafafa",
	user: {
		_id: "123",
		name: "Coloso",
	},
}; */

export const calendarSlice = createSlice({
	name: "calendar", // nombre del slice
	initialState: {
		// valores iniciales
		isLoadingEvents: true,
		events: [/* tempEvent */],
		activeEvent: null,
	},
	reducers: {
		onSetActiveEvent: (state, { payload }) => {
			//* active event = es la nota activa a la cual le hacemos un click
			state.activeEvent = payload;
		},
		onAddNewEvent: (state, { payload }) => {
			//* el payload = la nota lista y procesada con el ID ,
			state.events.push(payload);
			state.activeEvent = null; // ponemos en null la nota activa
		},
		onUpdateEvent: (state, { payload }) => {
			state.events = state.events.map((event) => {
				if (event.id === payload.id) {
					return payload;
				}
				return event;
			});
		},
		onDeleteEvent: (state) => {
			if (state.activeEvent) {
				//* si el evento activo (esta clickeado un evento no esta vacio)
				state.events = state.events.filter(
					//* filtramos , los eventos , si el id es igual al id clickeado lo borra
					(event) => event.id !== state.activeEvent.id
				);
				state.activeEvent = null;
				//* volvemos el activo evento a null
			}
		},
		onLoadEvents: (state, { payload = [] }) => {
			state.isLoadingEvents = false; //* ya terminamos de cargar los eventos
			/* state.events = payload; */
			//* por cada evento que haya
			payload.forEach(event => {
				//* recorremos el array de eventos donde el evento enviado es igual al evento que ya existe en el array
				const exist = state.events.some(dbEvent => dbEvent.id === event.id);
				//* si el evento no existe en el array
				if (!exist) {
					//* lo agregamos al array con un push
					state.events.push(event)
				}
			})
		},
		onLogoutCalendar: (state) => {
			state.isLoadingEvents = true,
				state.events = [],
				state.activeEvent = null
		}
	},
});

export const {
	onSetActiveEvent,
	onAddNewEvent,
	onUpdateEvent,
	onDeleteEvent,
	onLoadEvents,
	onLogoutCalendar
} =
	calendarSlice.actions;
