import { validarCorreoComunidad } from '../domain/correo';
import { RUTAS } from '../config';

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
        const correoLimpio = correo.trim();
        await this.auth.iniciarSesionComunidad(correoLimpio);
        this.vista.redirigir(RUTAS.LISTADO_PUBLICO || '/index.html');
    }
}