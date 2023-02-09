
export const CalendarEvent = ({ event }) => {
	const { title, user } = event;
	return (
		<>
			<strong>{title}</strong>
			<br></br>
			<span> - {user.name}</span>
		</>
	)
}
