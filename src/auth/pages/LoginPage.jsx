import './Login.css';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../hooks';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const loginFormFields = { //* valores por defecto que tendran los campos input del form login
	loginEmail: 'eapepe0@gmail.com',
	loginPassword: '1f1f46d'
}
const registerFormFields = { //* valores por defecto que tendran los campos input del form login
	registerName: 'Cristian',
	registerEmail: 'oyolibell@gmail.com',
	registerPassword: '11111111',
	registerPassword2: '11111111'
}

export const LoginPage = () => {

	const { startLogin, startRegister, errorMessage } = useAuthStore(); //* extraemos el authSlice la funcion startLogin y el estado errorMessage

	const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields) //* extraemos del form estos datos
	const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields) //* extraemos del form estos datos

	const loginSubmit = (event) => { //* si hacemos submit en el form login
		event.preventDefault(); //* prevenimos que se borre el form
		startLogin({ email: loginEmail, password: loginPassword }) //* lanzamos el startLogin con sus datos
	}

	const registerSubmit = (e) => { //* si hacemos submit en el form register
		e.preventDefault(); //*  prevenimos que se borre el form
		console.log(registerName, registerEmail, registerPassword, registerPassword2)
		if (registerPassword !== registerPassword2) {
			Swal.fire('Error en el password', "Los 2 passwords deben coincidir", 'error')
			return;
		}

		startRegister({ name: registerName, email: registerEmail, password: registerPassword })

	}

	useEffect(() => {
		if (errorMessage !== undefined) { //*  si es distinto a indefinido
			Swal.fire('Error en la autenticacion', errorMessage, 'error') //* mostramos un modal con el error
		}
	}, [errorMessage]) //* cada vez que cambia el errorMessage por defecto es undefined


	return (
		<div className="container login-container">
			<div className="row">
				<div className="col-md-6 login-form-1">
					<h3>Ingreso</h3>
					<form onSubmit={loginSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Correo"
								name='loginEmail'
								value={loginEmail}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name='loginPassword'
								value={loginPassword}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className="d-grid gap-2">
							<input
								type="submit"
								className="btnSubmit"
								value="Login"
							/>
						</div>
					</form>
				</div>

				<div className="col-md-6 login-form-2">
					<h3>Registro</h3>
					<form onSubmit={registerSubmit}>
						<div className="form-group mb-2">
							<input
								type="text"
								className="form-control"
								placeholder="Nombre"
								name='registerName'
								value={registerName}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="email"
								className="form-control"
								placeholder="Correo"
								name='registerEmail'
								value={registerEmail}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Contraseña"
								name='registerPassword'
								value={registerPassword}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className="form-group mb-2">
							<input
								type="password"
								className="form-control"
								placeholder="Repita la contraseña"
								name='registerPassword2'
								value={registerPassword2}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className="d-grid gap-2">
							<input
								type="submit"
								className="btnSubmit"
								value="Crear cuenta" />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}