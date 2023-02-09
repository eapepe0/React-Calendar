import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui", // nombre del slice
  initialState: {
    // valores iniciales
    isDateModalOpen: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      // nombre del reducer
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
