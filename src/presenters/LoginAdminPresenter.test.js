import { LoginAdminPresenter } from './LoginAdminPresenter';
import { AuthEnMemoria } from '../services/memoria/AuthEnMemoria';
import { MENSAJES } from '../domain/mensajes';

const crearVista = () => ({
    errores: [],
    mostrarError(mensaje) {
        this.errores.push(mensaje);
    },
});

describe('LoginAdminPresenter', () => {
    it('muestra el mensaje de campos vacios si no se ingresa correo ni contrasena', async () => {
        const vista = crearVista();
        const presenter = new LoginAdminPresenter(vista, {});

        await presenter.ingresar('', '');

        expect(vista.errores).toEqual([MENSAJES.CAMPOS_LOGIN_VACIOS]);
    });

    it('muestra credenciales invalidas si la contrasena es incorrecta', async () => {
        const vista = crearVista();
        const auth = new AuthEnMemoria({
            cuentas: [{ correo: 'admin@ucb.edu.bo', password: 'Admin123' }],
        });
        const presenter = new LoginAdminPresenter(vista, auth);

        await presenter.ingresar('admin@ucb.edu.bo', 'incorrecta');

        expect(vista.errores).toEqual([MENSAJES.CREDENCIALES_INVALIDAS]);
    });

    it('muestra credenciales invalidas si el correo no existe', async () => {
        const vista = crearVista();
        const auth = new AuthEnMemoria({
            cuentas: [{ correo: 'admin@ucb.edu.bo', password: 'Admin123' }],
        });
        const presenter = new LoginAdminPresenter(vista, auth);

        await presenter.ingresar('nadie@ucb.edu.bo', 'Admin123');

        expect(vista.errores).toEqual([MENSAJES.CREDENCIALES_INVALIDAS]);
    });
});