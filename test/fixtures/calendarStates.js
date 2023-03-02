export const events = [
	{
		id: '1',
		start: new Date('2023-01-01 00:00:00'),
		end: new Date('2023-01-01 02:00:00'),
		title: 'asdf',
		notes: 'fdsa',
	},
	{
		id: '2',
		start: new Date('2023-01-02 00:00:00'),
		end: new Date('2023-01-02 02:00:00'),
		title: 'Titulo',
		notes: 'Nota',
	}
]

export const initialState = {
	isLoadingEvents: true,
	events: [],
	activeEvent: null,
}

export const calendarWithEventsState = {
	isLoadingEvents: false,
	events: [...events],
	activeEvent: null,
}

export const calendarWithActiveEventsState = {
	isLoadingEvents: false,
	events: [...events],
	activeEvent: { ...events[0] },
}