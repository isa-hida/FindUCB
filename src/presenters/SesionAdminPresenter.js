import { RUTAS } from '../config.js';

export class SesionAdminPresenter {
    constructor(vista, auth) {
        this.vista = vista;
        this.auth = auth;
    }

    async verificarAcceso() {
        await this.auth.obtenerUsuario();
    }

    async cerrarSesion() {
        await this.auth.cerrarSesion();
        const rutaDestino = RUTAS.LOGIN || '/login.html';
        if (typeof this.vista.reemplazar === 'function') {
            this.vista.reemplazar(rutaDestino);
        } else if (typeof this.vista.redirigir === 'function') {
            this.vista.redirigir(rutaDestino);
        }
    }
}