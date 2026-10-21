import { validarCorreoComunidad } from '../domain/correo';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';

export class LoginAdminPresenter {
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

        const correoLimpio = correo ? correo.trim().toLowerCase() : '';

        if (correoLimpio !== 'adminbienestar@ucb.edu.bo') {
            this.vista.mostrarError(MENSAJES.CREDENCIALES_INVALIDAS);
            return;
        }

        await this.auth.iniciarSesionAdmin(correoLimpio);
        this.vista.redirigir(RUTAS.PANEL_ADMIN);
    }
}