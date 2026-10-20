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
        window.location.href = url;
    }

    alEnviar(callback) {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            callback();
        });
    }
}