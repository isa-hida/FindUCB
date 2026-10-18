import { LoginAdminPresenter } from './LoginAdminPresenter';
import { AuthEnMemoria } from '../services/memoria/AuthEnMemoria';
import { MENSAJES } from '../domain/mensajes';

describe('LoginAdminPresenter', () => {
    it('muestra el mensaje de campos vacios si no se ingresa correo ni contrasena', async () => {
        const vista = { mostrarError: jest.fn() };
        const presenter = new LoginAdminPresenter(vista, {});

        await presenter.ingresar('', '');

        expect(vista.mostrarError).toHaveBeenCalledWith(MENSAJES.CAMPOS_LOGIN_VACIOS);
    });

    it('muestra credenciales invalidas si la contrasena es incorrecta', async () => {
        const vista = { mostrarError: jest.fn() };
        const auth = new AuthEnMemoria({
            cuentas: [{ correo: 'admin@ucb.edu.bo', password: 'Admin123' }],
        });
        const presenter = new LoginAdminPresenter(vista, auth);

        await presenter.ingresar('admin@ucb.edu.bo', 'incorrecta');

        expect(vista.mostrarError).toHaveBeenCalledWith(MENSAJES.CREDENCIALES_INVALIDAS);
    });
});