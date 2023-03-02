import calendarApi from '../../src/api/calendarApi';


describe('Pruebas en el calendarApi', () => {
	test('debe de tener la configuracion por defecto', () => {
		//* esperamos que la baseUrl por defecto del calendar api sea igual a la variable de entorno que tenemos en este caso .env.test
		expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL)
	})
	test('debe de tener el x-token en el header de todas las peticiones', async () => {
		//* ponemos en el localStorage un token ficticio
		localStorage.setItem('token', 'ABC-123-XYZ')
		//* hacemos la llamada a la api
		const resp = await calendarApi.get('/auth');
		//* esperamos que en los headers x-token el valor sea el enviado al localStorage
		expect(resp.config.headers['x-token']).toBe('ABC-123-XYZ')
	})

});