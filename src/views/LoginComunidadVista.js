export class LoginComunidadVista {
    constructor() {
        this.form = document.getElementById('login-form');
        this.correoInput = document.getElementById('correo-input');
        this.errorMensaje = document.getElementById('error-mensaje');
    }

    obtenerCorreo() {
        return this.correoInput.value;
    }

    mostrarError(mensaje) {
        this.errorMensaje.textContent = mensaje;
        this.errorMensaje.hidden = false;
    }

    limpiarError() {
        this.errorMensaje.textContent = '';
        this.errorMensaje.hidden = true;
    }

    redirigir(url) {
        window.location.assign(url);
    }

    alEnviar(callback) {
        if (!this.form) {
            return;
        }

        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await callback();
        });
    }
}