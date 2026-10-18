import { LoginAdminPresenter } from './LoginAdminPresenter';
import { AuthEnMemoria } from '../services/memoria/AuthEnMemoria';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';

const CUENTAS = [
    { correo: 'admin@ucb.edu.bo', password: 'Admin123' },
    { correo: 'estudiante@ucb.edu.bo', password: 'Estudiante123' },
];

const crearEscenario = () => {
    const vista = {
        errores: [],
        redirecciones: [],
        mostrarError(mensaje) {
            this.errores.push(mensaje);
        },
        redirigir(url) {
            this.redirecciones.push(url);
        },
    };
    const auth = new AuthEnMemoria({
        cuentas: CUENTAS,
        administradores: ['admin@ucb.edu.bo'],
    });
    const presenter = new LoginAdminPresenter(vista, auth);
    return { vista, auth, presenter };
};

describe('LoginAdminPresenter', () => {
    it('muestra el mensaje de campos vacios si no se ingresa correo ni contrasena', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('', '');

        expect(vista.errores).toEqual([MENSAJES.CAMPOS_LOGIN_VACIOS]);
    });

    it('muestra credenciales invalidas si la contrasena es incorrecta', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('admin@ucb.edu.bo', 'incorrecta');

        expect(vista.errores).toEqual([MENSAJES.CREDENCIALES_INVALIDAS]);
    });

    it('muestra credenciales invalidas si el correo no existe', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('nadie@ucb.edu.bo', 'Admin123');

        expect(vista.errores).toEqual([MENSAJES.CREDENCIALES_INVALIDAS]);
    });

    it('no deja entrar a una persona de la comunidad aunque su contrasena sea correcta', async () => {
        const { vista, auth, presenter } = crearEscenario();

        await presenter.ingresar('estudiante@ucb.edu.bo', 'Estudiante123');

        expect(vista.errores).toEqual([MENSAJES.CREDENCIALES_INVALIDAS]);
        expect(vista.redirecciones).toEqual([]);
        expect(await auth.obtenerUsuario()).toBeNull();
    });

    it('lleva al panel si es un administrador con contrasena correcta', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('admin@ucb.edu.bo', 'Admin123');

        expect(vista.redirecciones).toEqual([RUTAS.PANEL_ADMIN]);
        expect(vista.errores).toEqual([]);
    });

    it('ignora los espacios alrededor del correo', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('  admin@ucb.edu.bo  ', 'Admin123');

        expect(vista.redirecciones).toEqual([RUTAS.PANEL_ADMIN]);
        expect(vista.errores).toEqual([]);
    });
});