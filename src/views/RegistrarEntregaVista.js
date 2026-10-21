export class RegistrarEntregaVista {
    constructor(documento) {
        this.formulario = documento.getElementById('entrega-form');
        this.campoNombre = documento.getElementById('nombre');
        this.campoCi = documento.getElementById('ci');
        this.campoCelular = documento.getElementById('celular');
        this.campoFecha = documento.getElementById('fecha-entrega');
        this.botonCancelar = documento.getElementById('cancelar-button');
        this.cajaError = documento.getElementById('error-mensaje');
        this.cajaExito = documento.getElementById('exito-mensaje');
    }

    alEnviar(manejador) {
        this.formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            manejador({
                nombre: this.campoNombre.value,
                ci: this.campoCi.value,
                celular: this.campoCelular.value,
                fechaEntrega: this.campoFecha.value,
            });
        });
    }

    alCancelar(manejador) {
        this.botonCancelar.addEventListener('click', () => {
            manejador();
        });
    }

    mostrarFechaEntrega(fecha) {
        this.campoFecha.value = fecha;
    }

    limpiarError() {
        this.cajaError.textContent = '';
        this.cajaError.hidden = true;
        this.cajaExito.textContent = '';
        this.cajaExito.hidden = true;
    }

    mostrarError(mensaje) {
        this.cajaError.textContent = mensaje;
        this.cajaError.hidden = false;
    }

    mostrarExito(mensaje) {
        this.cajaExito.textContent = mensaje;
        this.cajaExito.hidden = false;
    }

    ocultarFormulario() {
        this.formulario.hidden = true;
    }

    redirigir(url) {
        window.location.assign(url);
    }
}