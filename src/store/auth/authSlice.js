import { createSlice } from '@reduxjs/toolkit';


export const authSlice = createSlice({
	name: 'authSlice',  //* nombre del slice
	initialState: { //* valores iniciales
		status: 'checking', //* 'authenticated' , 'not-authenticated'
		user: {

		},
		errorMessage: undefined,
	},
	reducers: {
		onChecking: (state) => { //* pone el estado en checking
			state.status = 'checking';
			state.user = {};
			state.errorMessage = undefined;
		},
		onLogin: (state, { payload }) => { //* si estamos logueados , pone el estado en autenticado y los datos del usuario que manda el payload
			state.status = 'authenticated';
			state.user = payload;
			state.errorMessage = undefined;
		},
		onLogout: (state, { payload }) => { //* si no estamos logueados ponemos el estado en no-autenticado y ponemos un mensaje de error
			state.status = 'not-authenticated';
			state.user = {};
			state.errorMessage = payload;
		},
		clearErrorMessage: (state) => { //* borramos el mensaje de error
			state.errorMessage = undefined
		}

	},
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
	authSlice.actions;