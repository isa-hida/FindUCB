export class RegistrarObjetoVista {
    constructor(documento) {
        this.documento = documento;
        this.formulario = documento.getElementById('nuevo-objeto-form');
        this.errorElemento = documento.getElementById('error-mensaje');
        this.exitoElemento = documento.getElementById('exito-mensaje');
        this.fotoInput = documento.getElementById('foto-input');
        this.previewImagen = documento.getElementById('foto-preview');
        this.fotoPathActual = '';

        this._inicializarEventos();
    }

    _inicializarEventos() {
        if (this.fotoInput) {
            this.fotoInput.addEventListener('change', (e) => {
                const archivo = e.target.files[0];
                if (archivo) {
                    this.fotoPathActual = archivo.name;
                    if (this.previewImagen) {
                        this.previewImagen.src = URL.createObjectURL(archivo);
                        this.previewImagen.hidden = false;
                    }
                } else {
                    this.fotoPathActual = '';
                    if (this.previewImagen) {
                        this.previewImagen.hidden = true;
                    }
                }
            });
        }
    }

    alEnviar(callback) {
        this.formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(this.formulario);
            callback({
                categoria: formData.get('categoria'),
                descripcion: formData.get('descripcion'),
                senas: formData.get('senas'),
                fechaHallazgo: formData.get('fechaHallazgo'),
                lugar: formData.get('lugar'),
                color: formData.get('color'),
                marca: formData.get('marca'),
                fotoPath: this.fotoPathActual || formData.get('fotoPath') || '',
                encontradoPor: {
                    nombre: formData.get('encontradoNombre'),
                    celular: formData.get('encontradoCelular'),
                },
            });
        });
    }

    mostrarError(mensaje) {
        this.errorElemento.textContent = mensaje;
        this.errorElemento.hidden = false;
        this.exitoElemento.hidden = true;
    }

    limpiarError() {
        this.errorElemento.textContent = '';
        this.errorElemento.hidden = true;
    }

    mostrarExito(mensaje) {
        this.exitoElemento.textContent = mensaje;
        this.exitoElemento.hidden = false;
        this.errorElemento.hidden = true;
        this.formulario.reset();
        this.fotoPathActual = '';
        if (this.previewImagen) {
            this.previewImagen.hidden = true;
            this.previewImagen.src = '';
        }
    }
}