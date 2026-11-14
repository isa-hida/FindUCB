import { SesionComunidadPresenter } from './SesionComunidadPresenter.js';
import { AuthEnMemoria } from '../services/memoria/AuthEnMemoria.js';
import { RUTAS } from '../config.js';

const almacenamiento = {};
global.sessionStorage = {
    getItem: (clave) => almacenamiento[clave] || null,
    setItem: (clave, valor) => { almacenamiento[clave] = String(valor); },
    removeItem: (clave) => { delete almacenamiento[clave]; },
    clear: () => {
        Object.keys(almacenamiento).forEach((k) => delete almacenamiento[k]);
    },
};

describe('SesionComunidadPresenter (HU-03)', () => {
    let vista;
    let auth;
    let presenter;

    beforeEach(() => {
        sessionStorage.clear();
        vista = {
            redirecciones: [],
            redirigir(url) {
                this.redirecciones.push(url);
            },
            reemplazar(url) {
                this.redirecciones.push(url);
            },
        };
        auth = new AuthEnMemoria();
        presenter = new SesionComunidadPresenter(vista, auth);
    });

    it('exige iniciar sesión si se intenta entrar al listado sin sesión activa', async () => {
        await presenter.verificarAcceso();

        expect(vista.redirecciones).toEqual([RUTAS.LOGIN]);
    });

    it('permite el acceso si hay una sesión de comunidad activa', async () => {
        await auth.iniciarSesionComunidad('estudiante@ucb.edu.bo');

        await presenter.verificarAcceso();

        expect(vista.redirecciones).toEqual([]);
    });

    it('cierra la sesión de comunidad destruyendo el usuario y redirige al login', async () => {
        await auth.iniciarSesionComunidad('estudiante@ucb.edu.bo');

        await presenter.cerrarSesion();

        const usuarioActual = await auth.obtenerUsuario();
        expect(usuarioActual).toBeNull();
        expect(sessionStorage.getItem('usuario')).toBeNull();
        expect(vista.redirecciones).toEqual([RUTAS.LOGIN]);
    });
});