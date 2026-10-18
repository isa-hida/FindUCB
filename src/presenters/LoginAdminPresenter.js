import { validarLoginAdmin } from '../domain/correo';
import { MENSAJES } from '../domain/mensajes';
import { RUTAS } from '../config';

export class LoginAdminPresenter {
    constructor(vista, auth) {
        this.vista = vista;
        this.auth = auth;
    }

    async ingresar(correo, password) {
        const errores = validarLoginAdmin({ correo, password });
        if (errores.length > 0) {
            this.vista.mostrarError(errores[0]);
            return;
        }
        const resultado = await this.auth.iniciarSesionAdmin(correo, password);
        if (!resultado.ok) {
            this.vista.mostrarError(MENSAJES.CREDENCIALES_INVALIDAS);
            return;
        }
        const usuario = await this.auth.obtenerUsuario();
        if (!usuario || !usuario.esAdmin) {
            await this.auth.cerrarSesion();
            this.vista.mostrarError(MENSAJES.CREDENCIALES_INVALIDAS);
            return;
        }
        this.vista.redirigir(RUTAS.PANEL_ADMIN);
    }
}