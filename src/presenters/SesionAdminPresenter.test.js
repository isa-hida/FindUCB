import { SesionAdminPresenter } from './SesionAdminPresenter.js';
import { AuthEnMemoria } from '../services/memoria/AuthEnMemoria.js';
import { RUTAS } from '../config.js';

describe('SesionAdminPresenter (HU-03)', () => {
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
        };
        auth = new AuthEnMemoria();
        presenter = new SesionAdminPresenter(vista, auth);
    });

    it('exige iniciar sesión si se intenta entrar al panel sin sesión activa', async () => {
        await presenter.verificarAcceso();

        expect(vista.redirecciones).toEqual([RUTAS.LOGIN_ADMIN]);
    });

    it('exige iniciar sesión si el usuario autenticado no es administrador', async () => {
        await auth.iniciarSesionComunidad('estudiante@ucb.edu.bo');

        await presenter.verificarAcceso();

        expect(vista.redirecciones).toEqual([RUTAS.LOGIN_ADMIN]);
    });

    it('permite el acceso al panel si hay una sesión de administrador activa', async () => {
        await auth.iniciarSesionAdmin('adminbienestar@ucb.edu.bo');

        await presenter.verificarAcceso();

        expect(vista.redirecciones).toEqual([]);
    });

    it('cierra la sesión destruyendo el usuario y redirige al login', async () => {
        await auth.iniciarSesionAdmin('adminbienestar@ucb.edu.bo');

        await presenter.cerrarSesion();

        const usuarioActual = await auth.obtenerUsuario();
        expect(usuarioActual).toBeNull();
        expect(sessionStorage.getItem('usuario')).toBeNull();
        expect(vista.redirecciones).toEqual([RUTAS.LOGIN_ADMIN]);
    });
});