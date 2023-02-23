import { parseISO } from "date-fns"

export const convertEventsToDateEvents = (events = []) => {
	return events.map(event => {
		//* mapeamos todos los eventos y modificamos el start y el end a un formato leible por el calendar
		event.start = parseISO(event.start)
		event.end = parseISO(event.end)

		return event
	})
}