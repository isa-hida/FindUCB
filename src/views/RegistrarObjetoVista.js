export class RegistrarObjetoVista {
    constructor(documento) {
        this.formulario = documento.getElementById('nuevo-objeto-form');
        this.campoCategoria = documento.getElementById('categoria');
        this.campoDescripcion = documento.getElementById('descripcion');
        this.campoSenas = documento.getElementById('senas');
        this.campoFecha = documento.getElementById('fecha-hallazgo');
        this.campoLugar = documento.getElementById('lugar');
        this.campoColor = documento.getElementById('color');
        this.campoMarca = documento.getElementById('marca');
        this.campoNombreEncontro = documento.getElementById('encontrado-nombre');
        this.campoCelularEncontro = documento.getElementById('encontrado-celular');
        this.cajaError = document.getElementById('error-mensaje');
        this.cajaExito = document.getElementById('exito-mensaje');
    }

    alEnviar(manejador) {
        this.formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            manejador({
                categoria: this.campoCategoria.value,
                descripcion: this.campoDescripcion.value,
                senas: this.campoSenas.value,
                fechaHallazgo: this.campoFecha.value,
                lugar: this.campoLugar.value,
                color: this.campoColor.value,
                marca: this.campoMarca.value,
                encontradoPor: {
                    nombre: this.campoNombreEncontro.value,
                    celular: this.campoCelularEncontro.value,
                },
            });
        });
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
        this.formulario.reset();
    }
}