import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store";
export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    //TODO llegar al backend

    //TODO ok
    if (calendarEvent._id) {
      //actualizando
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      //creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
      // creamos un nuevo evento al cual le agregamos un nuevo id
    }
  };

  const startDeletingEvent = () => {
    dispatch(onDeleteEvent());
  };

  return {
    //* props
    activeEvent,
    events,
    hasEventSelected: !!activeEvent, // si es null regresa falso y si esta cargado con algo regresa true
    //* method
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
