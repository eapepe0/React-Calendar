import { useMemo, useState, useEffect } from 'react';
import Modal from 'react-modal'
import { addHours, differenceInSeconds } from 'date-fns'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import es from 'date-fns/locale/es'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks';

// cambiamos el idioma del DatePicker
registerLocale('es', es)

// estilos del modal
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

// cargamos el modal en el elemento
Modal.setAppElement('#root');
export const CalendarModal = () => {
	//* estado que nos dice si apretamos el boton submit
	const [isSubmitted, setIsSubmitted] = useState(false)
	//* estado que maneja el form
	const [formValues, setFormValues] = useState({
		title: 'Cristian',
		notes: 'asdf',
		start: new Date(),
		end: addHours(new Date(), 2),

	})
	//* estado de redux que nos dice si el Modal esta abierto lo maneja redux
	const { isDateModalOpen, closeDateModal } = useUiStore();

	//* estado de redux que nos da los datos del evento

	const { activeEvent, startSavingEvent } = useCalendarStore();

	//* si cambia el evento , copiamos todo el estado , y sobreescribimos solamente lo que cambiamos
	const onInputChanged = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value
		})
	}
	//* funcion que se encarga de cerrar el modal
	const onCloseModal = () => {
		console.log('Cerrando modal')
		closeDateModal()
	}

	//* si cambia la fecha , mandamos el evento y que cambia si el (start | end)
	//* copiamos todo el estado , y modificamos solamente lo que cambia
	const onDateChanged = (event, changing) => {
		setFormValues({
			...formValues,
			[changing]: event
		})
	}

	//* maneja la class que va a tener si el titulo es valido o no
	const titleClass = useMemo(() => {
		if (!isSubmitted) return ''; // si isSubmited es falso devulve nada

		return (formValues.title.length > 0) // si el titulo es mayor a 0
			? 'is-valid' // ponemos la clase valida
			: 'is-invalid' // de lo contrario ponemos la clase invalida

	}, [formValues, isSubmitted])

	//* si apretamos el boton submit
	const onSubmit = async (event) => {
		event.preventDefault();
		setIsSubmitted(true)
		//validaciones
		const difference = differenceInSeconds(formValues.end, formValues.start);
		// la diferencia en segundos entre la fecha final y la fecha inicial , si es negativo la fecha final es anterior a la fecha inicial
		if (isNaN(difference) || difference <= 0) { // si el resultado no es un numero o es menor igual a 0
			console.log('Error en las fechas') // devolvemos un error y volvemos
			Swal.fire('Fechas incorrectas', "Revisar las fechas ingresadas", 'error');
			return;
		}
		if (formValues.title.length <= 0) {
			console.log('El titulo no puede estar vacio')
			Swal.fire('Titulo incorrecto', "El titulo no puede estar vacio", 'error');
			return; // si el titulo esta vacio
		}

		console.log(formValues)

		//todo
		await startSavingEvent(formValues)
		closeDateModal();
		setIsSubmitted(false)
	}

	//* cada vez que se modifica una nota activa se cambias los datos a dentro del form
	useEffect(() => {
		if (activeEvent !== null) { //* se cambian los valores si no es null (no hay ninguna nota activa)
			setFormValues({ ...activeEvent })
		}
	}, [activeEvent])
	//* se dispara el useEffect cada vez que cambia la nota activa


	return (
		<Modal isOpen={isDateModalOpen}
			onRequestClose={onCloseModal}
			style={customStyles}
			className='modal'
			overlayClassName={"modal-fondo"}
			closeTimeoutMS={200}
		>
			<h1> Nuevo evento </h1>
			<hr />
			<form className="container" onSubmit={onSubmit}>

				<div className="form-group mb-2">
					<label>Fecha y hora inicio</label>
					<DatePicker selected={formValues.start}
						className='form-control'
						onChange={(event) => onDateChanged(event, 'start')}
						dateFormat='Pp'
						showTimeSelect
						locale='es'
						timeCaption='Hora'
					/>
				</div>

				<div className="form-group mb-2">
					<label>Fecha y hora fin</label>
					<DatePicker selected={formValues.end}
						className='form-control'
						onChange={(event) => onDateChanged(event, 'end')}
						dateFormat='Pp'
						showTimeSelect
						locale='es'
						timeCaption='Hora'
						minDate={formValues.start}
					/>
				</div>

				<hr />
				<div className="form-group mb-2">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${titleClass}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={formValues.title}
						onChange={onInputChanged}
					/>
					<small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
				</div>

				<div className="form-group mb-2">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						value={formValues.notes}
						onChange={onInputChanged}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">Información adicional</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"

				>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>

			</form>
		</Modal >
	)
}
