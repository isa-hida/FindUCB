import { RUTAS } from '../config.js';

export class SesionComunidadPresenter {
    constructor(vista, auth) {
        this.vista = vista;
        this.auth = auth;
    }

    async verificarAcceso() {
        const usuario = await this.auth.obtenerUsuario();
        if (!usuario) {
            this.vista.reemplazar(RUTAS.LOGIN);
            return false;
        }
        return true;
    }

    async cerrarSesion() {
        await this.auth.cerrarSesion();
        const rutaDestino = RUTAS.LOGIN || './login.html';
        if (typeof this.vista.reemplazar === 'function') {
            this.vista.reemplazar(rutaDestino);
        } else {
            window.location.replace(rutaDestino);
        }
    }
}