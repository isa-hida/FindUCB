import { LoginAdminPresenter } from './LoginAdminPresenter';
import { MENSAJES } from '../domain/mensajes';

describe('LoginAdminPresenter', () => {
    it('muestra el mensaje de campos vacios si no se ingresa correo ni contrasena', async () => {
        const vista = { mostrarError: jest.fn() };
        const presenter = new LoginAdminPresenter(vista, {});

        await presenter.ingresar('', '');

        expect(vista.mostrarError).toHaveBeenCalledWith(MENSAJES.CAMPOS_LOGIN_VACIOS);
    });
});