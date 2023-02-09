import React from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'
import { addHours } from 'date-fns'

export const FabAddNew = () => {
	const { openDateModal } = useUiStore(); //* extraemos la prop para abrir el modal
	const { setActiveEvent } = useCalendarStore() //* sacamos el metodo para cambiar el evento activo
	const handleClickNew = () => {
		//* borramos las notas activas
		setActiveEvent({
			title: "",
			notes: "",
			start: new Date(),
			end: addHours(new Date(), 2),
			bgColor: "#fafafa",
			user: {
				_id: "",
				name: "",
			},
		})
		//* abrimos el modal
		openDateModal()
	}
	return (
		<button className="btn btn-primary fab" onClick={handleClickNew}><i className="fas fa-plus"></i></button>
	)
}
