import { validarCorreoComunidad } from '../domain/correo.js';
import { RUTAS } from '../config.js';

export class LoginComunidadPresenter {
    constructor(vista, auth) {
        this.vista = vista;
        this.auth = auth;
    }

    async ingresar(correo) {
        this.vista.limpiarError();

        const errores = validarCorreoComunidad(correo);
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
            return;
        }

        const correoLimpio = correo.trim().toLowerCase();

        if (correoLimpio === 'adminbienestar@ucb.edu.bo' || correoLimpio === 'admin@ucb.edu.bo') {
            await this.auth.iniciarSesionAdmin(correoLimpio);
            this.vista.redirigir(RUTAS.PANEL_ADMIN);
        } else {
            await this.auth.iniciarSesionComunidad(correoLimpio);
            this.vista.redirigir('/index.html');
        }
    }
}