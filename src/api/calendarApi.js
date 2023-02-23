import axios from 'axios';
import { getEnvVariables } from '../helpers';
const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
	baseURL: VITE_API_URL
});

//* intercepta las peticiones y le agrega al header el token en x-token el cual utilizamos en renew
//* cada peticion que se haga de aca en mas , va a tener un token en caso que exista

calendarApi.interceptors.request.use(config => {
	config.headers = {
		'x-token': localStorage.getItem('token')
	}
	return config;
})

export default calendarApi;