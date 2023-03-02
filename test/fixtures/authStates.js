export const initialState = { //* valores iniciales
	status: 'checking', //* 'authenticated' , 'not-authenticated'
	user: {},
	errorMessage: undefined,
}

export const authenticatedState = { //* valores iniciales
	status: 'authenticated', //* 'authenticated' , 'not-authenticated'
	user: {
		uid: 'abc',
		name: 'Cristian'
	},
	errorMessage: undefined,
}

export const notAuthenticatedState = { //* valores iniciales
	status: 'not-authenticated', //* 'authenticated' , 'not-authenticated'
	user: {},
	errorMessage: undefined,
}