export class AuthEnMemoria {
    constructor({ cuentas = [], administradores = [] } = {}) {
        this.cuentas = cuentas;
        this.administradores = administradores;
        this.usuario = null;
    }

    async iniciarSesionAdmin(correo, password) {
        const cuenta = this.cuentas.find((c) => c.correo === correo && c.password === password);
        if (!cuenta) {
            return { ok: false };
        }
        this.usuario = { correo: cuenta.correo, esAdmin: this.administradores.includes(cuenta.correo) };
        return { ok: true };
    }

    async obtenerUsuario() {
        return this.usuario;
    }

    async cerrarSesion() {
        this.usuario = null;
    }
}