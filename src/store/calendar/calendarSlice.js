import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
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
};

export const calendarSlice = createSlice({
  name: "calendar", // nombre del slice
  initialState: {
    // valores iniciales
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      // active event = es la nota activa a la cual le hacemos un click
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      // el payload = la nota lista y procesada con el ID ,
      state.events.push(payload);
      state.activeEvent = null; // ponemos en null la nota activa
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        // si el evento activo (esta clickeado un evento no esta vacio)
        state.events = state.events.filter(
          // filtramos , los eventos , si el id es igual al id clickeado lo borra
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
        // volvemos el activo evento a null
      }
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } =
  calendarSlice.actions;
