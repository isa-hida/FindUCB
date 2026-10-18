import { validarLoginAdmin } from '../domain/correo';

export class LoginAdminPresenter {
    constructor(vista, auth) {
        this.vista = vista;
        this.auth = auth;
    }

    async ingresar(correo, password) {
        const errores = validarLoginAdmin({ correo, password });
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
        }
    }
}