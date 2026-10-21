import { LoginComunidadPresenter } from './LoginComunidadPresenter';
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
        async iniciarSesionComunidad(_correo) {
            return { ok: true };
        },
        async iniciarSesionAdmin(_correo) {
            return { ok: true };
        },
    };
    const presenter = new LoginComunidadPresenter(vista, auth);
    return { vista, auth, presenter };
};

describe('LoginComunidadPresenter', () => {
    it('muestra error si el correo está vacío', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('');

        expect(vista.errores).toEqual([MENSAJES.CAMPOS_LOGIN_VACIOS]);
    });

    it('muestra error si el correo no es institucional', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('usuario@gmail.com');

        expect(vista.errores).toEqual([MENSAJES.CORREO_NO_INSTITUCIONAL]);
    });

    it('redirige al listado si el correo es institucional valido', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('estudiante@ucb.edu.bo');

        expect(vista.errores).toEqual([]);
        expect(vista.redirecciones).toEqual([RUTAS.LISTADO_PUBLICO || '/index.html']);
    });
    
    it('redirige al panel de administración si el correo es adminbienestar@ucb.edu.bo', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('adminbienestar@ucb.edu.bo');

        expect(vista.errores).toEqual([]);
        expect(vista.redirecciones).toEqual([RUTAS.PANEL_ADMIN || '/admin.html']);
    });

});