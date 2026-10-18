export class AuthEnMemoria {
    constructor({ cuentas = [] } = {}) {
        this.cuentas = cuentas;
    }

    async iniciarSesionAdmin(correo, password) {
        const cuenta = this.cuentas.find((c) => c.correo === correo && c.password === password);
        if (!cuenta) {
            return { ok: false };
        }
        return { ok: true };
    }
}