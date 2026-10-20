export class AuthEnMemoria {
    constructor({ cuentas = [], administradores = [] } = {}) {
        this.cuentas = cuentas;
        this.administradores = administradores;
        const usuarioGuardado = sessionStorage.getItem('usuario');
        this.usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
    }

    async iniciarSesionAdmin(correo, password) {
        const cuenta = this.cuentas.find((c) => c.correo === correo && c.password === password);
        if (!cuenta) {
            return { ok: false };
        }
        this.usuario = {
            correo: cuenta.correo,
            esAdmin: this.administradores.includes(cuenta.correo),
        };
        sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
        return { ok: true };
    }

    async iniciarSesionComunidad(correo) {
        this.usuario = {
            correo: correo.trim(),
            esAdmin: false,
        };
        sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
        return { ok: true };
    }

    async obtenerUsuario() {
        return this.usuario;
    }

    async cerrarSesion() {
        this.usuario = null;
        sessionStorage.removeItem('usuario');
    }
}