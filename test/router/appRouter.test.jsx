import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar';
import { useAuthStore } from '../../src/hooks';
import { AppRouter } from '../../src/router/AppRouter';



jest.mock('../../src/hooks'); //* hacemos un mock de los hooks
jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))//* hacemos un mock del componente <CalendarPage>


describe('Pruebas en <AppRouter />', () => {
    const mockCheckAuthToken = jest.fn(); //* hacemos un mock del checkAuthToken
    beforeEach(() => jest.clearAllMocks());//* despues de cada ejecucion borramos los mocks

    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        }); //* emulamos el useAuthStore con sus estados
        render(<AppRouter />) //* renderizamos el componente
        screen.debug() //* mostramos en patalla al componente
        expect(screen.getByText('Cargando ...')).toBeTruthy() //* si existe en pantalla el texto 'Cargando ...'
        expect(mockCheckAuthToken).toHaveBeenCalled() //* que sea llamado el mockCheckAuthToken
    })

    test('debe de mostrar el login en caso de no estar autenticado', () => {
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        }); //* emulamos el useAuthStore con sus estados

        const { container } = render(<MemoryRouter> //* al usar Router debemos envolverlo en MemoryRouter
            <AppRouter />
        </MemoryRouter>) //* renderizamos el componente
        screen.debug()
        expect(screen.getByText('Ingreso')).toBeTruthy();
        expect(container).toMatchSnapshot()
    })

    test('debe de mostrar el calendario en caso de estar autenticado', () => {
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        }); //* emulamos el useAuthStore con sus estados
        //* al usar Router debemos envolverlo en MemoryRouter
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>) //* renderizamos el componente
        screen.debug()
        expect(screen.getByText('CalendarPage')).toBeTruthy() //* esperamos que este el texto CalendarPage

    })

});