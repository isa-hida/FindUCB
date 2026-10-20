import { LoginComunidadPresenter } from './LoginComunidadPresenter';
import { MENSAJES } from '../domain/mensajes';

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
        iniciarSesionComunidad(_correo) {
            return { ok: true };
        },
    };
    const presenter = new LoginComunidadPresenter(vista, auth);
    return { vista, auth, presenter };
};

describe('LoginComunidadPresenter', () => {
    it('muestra error si el correo no es institucional', async () => {
        const { vista, presenter } = crearEscenario();

        await presenter.ingresar('usuario@gmail.com');

        expect(vista.errores).toEqual([MENSAJES.CORREO_NO_INSTITUCIONAL]);
    });
});