export class LoginAdminVista {
    constructor(documento) {
        this.formulario = documento.getElementById('login-form');
        this.campoCorreo = documento.getElementById('correo');
        this.campoPassword = documento.getElementById('password');
        this.cajaError = documento.getElementById('error-mensaje');
    }

    alEnviar(manejador) {
        this.formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            manejador(this.campoCorreo.value, this.campoPassword.value);
        });
    }

    limpiarError() {
        this.cajaError.textContent = '';
        this.cajaError.hidden = true;
    }

    mostrarError(mensaje) {
        this.cajaError.textContent = mensaje;
        this.cajaError.hidden = false;
    }

    redirigir(url) {
        window.location.assign(url);
    }
}