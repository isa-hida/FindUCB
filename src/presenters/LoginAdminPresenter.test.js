import { LoginAdminPresenter } from './LoginAdminPresenter';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';

const crearEscenario = () => {
    const vista = {
        errores: [],
        redirecciones: [],
        mostrarError(mensaje) {
            this.errores.push(mensaje);
        },
        limpiarError() {
            this.errores = [];
        },
        redirigir(url) {
            this.redirecciones.push(url);
        },
    };
    const auth = {
        async iniciarSesionAdmin(_correo) {
            return { ok: true };
        },
    };
    const presenter = new LoginAdminPresenter(vista, auth);
    return { vista, auth, presenter };
};

describe('LoginAdminPresenter', () => {
    it('muestra el mensaje de campos vacíos si el correo está vacío', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('');

        expect(vista.errores).toEqual([MENSAJES.CAMPOS_LOGIN_VACIOS]);
    });

    it('muestra credenciales inválidas si el correo no es de administración', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('estudiante@ucb.edu.bo');

        expect(vista.errores).toEqual([MENSAJES.CREDENCIALES_INVALIDAS]);
        expect(vista.redirecciones).toEqual([]);
    });

    it('lleva al panel si el correo es exactamente adminbienestar@ucb.edu.bo', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('adminbienestar@ucb.edu.bo');

        expect(vista.redirecciones).toEqual([RUTAS.PANEL_ADMIN]);
        expect(vista.errores).toEqual([]);
    });

    it('ignora los espacios alrededor del correo', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('  adminbienestar@ucb.edu.bo  ');

        expect(vista.redirecciones).toEqual([RUTAS.PANEL_ADMIN]);
        expect(vista.errores).toEqual([]);
    });

    it('limpia el error anterior en cada intento', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('estudiante@ucb.edu.bo');
        await presenter.ingresar('adminbienestar@ucb.edu.bo');

        expect(vista.errores).toEqual([]);
        expect(vista.redirecciones).toEqual([RUTAS.PANEL_ADMIN]);
    });
});